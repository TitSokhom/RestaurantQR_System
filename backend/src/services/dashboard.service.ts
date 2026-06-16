import prisma from "../config/prisma";

export const getStats = async () => {
  const totalOrders = await prisma.order.count();
  const totalFoods = await prisma.food.count();
  const totalTables = await prisma.table.count();
  const totalPayments = await prisma.payment.count();

  return {
    totalOrders,
    totalFoods,
    totalTables,
    totalPayments,
  };
};