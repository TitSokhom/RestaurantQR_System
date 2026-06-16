import prisma from "../config/prisma";
import { Prisma } from "@prisma/client";

interface OrderItemInput {
  foodId: string;
  quantity: number;
}

export const createOrder = async (
  tableId: string,
  items: OrderItemInput[],
  userId?: string
) => {
  let totalPrice = new Prisma.Decimal(0);

  const orderItems = [];

  for (const item of items) {
    const food = await prisma.food.findUnique({
      where: { id: item.foodId },
    });

    if (!food) {
      throw new Error("Food not found");
    }

    const subtotal = new Prisma.Decimal(food.price).mul(
      item.quantity
    );

    totalPrice = totalPrice.add(subtotal);

    orderItems.push({
      foodId: food.id,
      quantity: item.quantity,
      price: food.price,
      subtotal,
    });
  }

  const order = await prisma.order.create({
    data: {
      tableId,
      userId,
      totalPrice,
      items: {
        create: orderItems,
      },
    },
    include: {
      items: true,
      table: true,
    },
  });
  return order;
};

export const getOrders = async () => {
  return prisma.order.findMany({
    include: {
      table: true,
      items: {
        include: {
          food: true,
        },
      },
    },
  });
};

// export const getInvoice = async (
//   orderId: string
// ) => {
//   return prisma.order.findUnique({
//     where: { id: orderId },
//     include: {
//       table: true,
//       items: {
//         include: {
//           food: true,
//         },
//       },
//       payment: true,
//     },
//   });
// };

export const getInvoice = async (
  orderId: string
) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      table: true,
      payment: true,
      items: {
        include: {
          food: true,
        },
      },
    },
  });

  if (!order) return null;

  return {
    orderId: order.id,
    tableNumber: order.table.tableNumber,
    status: order.status,
    totalPrice: order.totalPrice,
    payment: order.payment,
    items: order.items.map((item) => ({
      food: item.food.name,
      quantity: item.quantity,
      price: item.price,
      subtotal: item.subtotal,
    })),
  };
};