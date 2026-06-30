import { Prisma, PrismaClient, StockType } from "@prisma/client";

const prisma = new PrismaClient();

// CREATE
export const createIngredient = async (data: any) => {
  return prisma.ingredient.create({
    data: {
      name: data.name,
      stock: Number(data.stock),
      unit: data.unit,
      minStock: Number(data.minStock),
      costPerUnit: String(data.costPerUnit),
      expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
      categoryId: data.categoryId || null,
    },
  });
};

// GET ALL
// export const getAllIngredients = async () => {
//   return await prisma.ingredient.findMany({
//     orderBy: { createdAt: "desc" },
//   });
// };

export const getAllIngredients = async () => {
  const ingredients = await prisma.ingredient.findMany({
    select: {
      id: true,
      name: true,
      stock: true,
      minStock: true,
      expiryDate: true,
      costPerUnit: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const totalStockValue = ingredients.reduce((sum, item) => {
    return sum + item.stock * Number(item.costPerUnit);
  }, 0);

  const lowStockItems = ingredients.filter(
    (item) => item.stock <= item.minStock,
  ).length;

  const expiredItems = ingredients.filter(
    (item) => item.expiryDate && new Date(item.expiryDate) < new Date(),
  ).length;

  const pendingOrders = await prisma.order.count({
    where: {
      status: "PENDING",
    },
  });

  return {
    totalStockValue,
    lowStockItems,
    pendingOrders,
    expiredItems,
    growth: 12,
    wasteEstimate: 150,
    nextDelivery: "Tomorrow",
  };
};

// GET BY ID
export const getIngredientById = async (id: string) => {
  return await prisma.ingredient.findUnique({
    where: { id },
  });
};

// UPDATE
export const updateIngredient = async (id: string, data: any) => {
  return await prisma.ingredient.update({
    where: { id },
    data,
  });
};

// DELETE
export const deleteIngredient = async (id: string) => {
  return await prisma.ingredient.delete({
    where: { id },
  });
};

export const deductInventory = async (
  tx: Prisma.TransactionClient,
  order: any,
) => {
  // Loop every ordered food
  for (const orderItem of order.items) {
    // Loop every ingredient in the recipe
    for (const recipe of orderItem.food.ingredients) {
      // Quantity to deduct
      const usedQty = recipe.quantity * orderItem.quantity;

      // Get latest ingredient
      const ingredient = await tx.ingredient.findUnique({
        where: {
          id: recipe.ingredientId,
        },
      });

      if (!ingredient) {
        throw new Error(`Ingredient not found (${recipe.ingredientId})`);
      }

      // Validate stock
      if (ingredient.stock < usedQty) {
        throw new Error(
          `Insufficient stock for ${ingredient.name}
Current: ${ingredient.stock}
Required: ${usedQty}`,
        );
      }

      // Deduct stock
      await tx.ingredient.update({
        where: {
          id: ingredient.id,
        },
        data: {
          stock: {
            decrement: usedQty,
          },
        },
      });

      // Save transaction history
      await tx.stockTransaction.create({
        data: {
          ingredientId: ingredient.id,
          orderId: order.id,
          quantity: usedQty,
          type: StockType.OUT,
          note: `Auto deduct from Order ${order.id}`,
        },
      });
    }
  }
};

export interface InventoryQuery {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  status?: "LOW" | "OUT" | "NORMAL";
}

export const getInventory = async ({
  page = 1,
  limit = 10,
  search = "",
  categoryId,
}: InventoryQuery) => {

  const where: any = {};

  if (search) {
    where.name = {
      contains: search,
      mode: "insensitive",
    };
  }

  if (categoryId) {
    where.categoryId = categoryId;
  }

  const [items, total] = await Promise.all([
    prisma.ingredient.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * limit,
      take: limit,
    }),

    prisma.ingredient.count({
      where,
    }),
  ]);

  return {
    data: items,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

export const getInventoryStats = async () => {

  const ingredients = await prisma.ingredient.findMany();

  const totalStockValue = ingredients.reduce(
    (sum, i) => sum + i.stock * Number(i.costPerUnit),
    0
  );

  const lowStockItems = ingredients.filter(
    i => i.stock <= i.minStock
  ).length;

  const expiredItems = ingredients.filter(
    i =>
      i.expiryDate &&
      new Date(i.expiryDate) < new Date()
  ).length;

  const pendingOrders = await prisma.order.count({
    where: {
      status: "PENDING",
    },
  });

  return {
    totalStockValue,
    lowStockItems,
    pendingOrders,
    expiredItems,
    growth: 0,
    wasteEstimate: 0,
    nextDelivery: "-",
  };
};
