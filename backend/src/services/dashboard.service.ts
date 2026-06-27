import prisma from "../config/prisma";

// export const getStats = async () => {
//   const totalOrders = await prisma.order.count();
//   const totalFoods = await prisma.food.count();
//   const totalTables = await prisma.table.count();
//   const totalPayments = await prisma.payment.count();

//   return {
//     totalOrders,
//     totalFoods,
//     totalTables,
//     totalPayments,
//   };
// };

export const getDashboardStats = async () => {
  const [
    revenueResult,
    totalOrders,
    pendingOrders,
    activeTables,
  ] = await Promise.all([
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