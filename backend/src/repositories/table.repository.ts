import prisma from "../config/prisma";
import { TableStatus } from "@prisma/client";

type CreateTableDTO = {
  tableNumber: number;
  qrCode?: string;
  status?: TableStatus;
};

type UpdateTableDTO = Partial<CreateTableDTO>;

// CREATE TABLE
export const create = async (data: CreateTableDTO) => {
  return prisma.table.create({
    data,
  });
};

// GET ALL TABLES
export const findAll = async () => {
  return prisma.table.findMany({
    orderBy: {
      tableNumber: "asc",
    },
  });
};

// GET TABLE BY ID
export const findById = async (id: string) => {
  return prisma.table.findUnique({
    where: { id },
  });
};

// UPDATE TABLE
export const update = async (
  id: string,
  data: UpdateTableDTO
) => {
  return prisma.table.update({
    where: { id },
    data,
  });
};

// DELETE TABLE
export const remove = async (id: string) => {
  return prisma.table.delete({
    where: { id },
  });
};