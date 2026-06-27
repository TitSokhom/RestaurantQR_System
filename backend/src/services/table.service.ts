import QRCode from "qrcode";
import prisma from "../config/prisma";
import { Prisma, TableStatus } from "@prisma/client";

interface CreateTableInput {
  tableNumber: string;
  capacity: number;
  zone: string;
  status?: TableStatus;
}

// CREATE TABLE + QR CODE
export const createTable = async (data: CreateTableInput) => {
  // 1. Create table first
  const table = await prisma.table.create({
    data: {
      tableNumber: data.tableNumber,
      capacity: data.capacity,
      zone: data.zone,
      status: data.status ?? TableStatus.AVAILABLE,
    },
  });

  // 2. Generate QR URL
  const qrUrl = `${process.env.FRONTEND_URL}/menu/${table.id}`;

  // 3. Generate QR Code image (base64)
  const qrCode = await QRCode.toDataURL(qrUrl);

  // 4. Update table with QR code
  const updatedTable = await prisma.table.update({
    where: { id: table.id },
    data: { qrCode },
  });

  return updatedTable;
};

// GET ALL TABLES
export const findAll = async () => {
  return prisma.table.findMany({
    orderBy: { tableNumber: "asc" },
  });
};

// GET ONE TABLE BY ID
export const findById = async (id: string) => {
  return prisma.table.findUnique({
    where: { id },
  });
};

// DELETE TABLE
export const remove = async (id: string) => {
  return prisma.table.delete({
    where: { id },
  });
};


export const update = async (
  id: string,
  data: {
    tableNumber: string;
    capacity: number;
    zone: string;
    status: TableStatus;
  }
) => {
  return prisma.table.update({
    where: { id },
    data,
  });
};

export const updateTable = async (
  tableId: string,
  status: "AVAILABLE" | "OCCUPIED"
) => {
  return prisma.table.update({
    where: { id: tableId },
    data: { status },
  });
};