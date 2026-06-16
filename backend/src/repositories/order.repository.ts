import prisma from "../config/prisma";
import { OrderStatus } from "@prisma/client";

// CREATE ORDER
export const createOrder = async (data: any) => {
  return prisma.order.create({
    data,
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

// GET ALL
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

// GET BY ID
export const getOrderById = async (id: string) => {
  return prisma.order.findUnique({
    where: { id },
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

// UPDATE STATUS
export const updateStatus = async (
  id: string,
  status: OrderStatus
) => {
  return prisma.order.update({
    where: { id },
    data: { status },
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