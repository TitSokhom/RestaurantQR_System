import prisma from "../config/prisma";
type Timeframe = "this_week" | "last_week" | "this_month";

export const getDashboardStats = async () => {
  const [revenueResult, totalOrders, pendingOrders, activeTables] =
    await Promise.all([
      prisma.order.aggregate({
        _sum: {
          totalPrice: true,
        },
      }),

      prisma.order.count(),

      prisma.order.count({
        where: {
          status: "PENDING",
        },
      }),

      prisma.table.count({
        where: {
          orders: {
            some: {
              status: "PENDING",
            },
          },
        },
      }),
    ]);

  return {
    totalRevenue: Number(revenueResult._sum.totalPrice ?? 0),
    totalOrders,
    pendingOrders,
    activeTables,
  };
};

export const getDashboard = async (timeframe: Timeframe) => {
  const now = new Date();
  let startDate = new Date();

  if (timeframe === "this_week") {
    startDate.setDate(now.getDate() - 7);
  }

  if (timeframe === "last_week") {
    startDate.setDate(now.getDate() - 14);
  }

  if (timeframe === "this_month") {
    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  }

  const orders = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: startDate,
      },
    },
    include: {
      items: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const revenueMap: Record<string, number> = {};

  orders.forEach((order) => {
    let label = "";

    if (timeframe === "this_month") {
      const week = Math.ceil(order.createdAt.getDate() / 7);
      label = `Week ${week}`;
    } else {
      label = order.createdAt.toLocaleDateString("en-US", {
        weekday: "short",
      });
    }

    const total = order.items.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0
    );

    revenueMap[label] = (revenueMap[label] || 0) + total;
  });

  const revenue = Object.entries(revenueMap).map(([day, amount]) => ({
    day,
    amount,
  }));

  const foodStats: Record<
    string,
    { id: string; name: string; orders: number }
  > = {};

  orders.forEach((order) => {
    order.items.forEach((item) => {
      if (!foodStats[item.foodId]) {
        foodStats[item.foodId] = {
          id: item.foodId,
          name: item.foodName,
          orders: 0,
        };
      }

      foodStats[item.foodId].orders += item.quantity;
    });
  });

  const topFoods = Object.values(foodStats)
    .sort((a, b) => b.orders - a.orders)
    .slice(0, 5);

  return {
    revenue,
    topFoods,
  };
};