import QRCode from "qrcode";
import prisma from "../config/prisma";

// CREATE TABLE + QR CODE
export const createTable = async (tableNumber: number) => {
  // 1. Create table first
  const table = await prisma.table.create({
    data: {
      tableNumber,
    },
  });

  // 2. Generate QR URL
  const qrUrl = `http://localhost:5001/menu?table=${table.id}`;
  //  const qrUrl = `http://localhost:3000/api/order?table=${table.id}`;
  // 3. Convert URL → QR image (base64)
  const qrCode = await QRCode.toDataURL(qrUrl);

  // 4. Update table with QR
  const updatedTable = await prisma.table.update({
    where: {
      id: table.id,
    },
    data: {
      qrCode,
      //qrUrl,
    },
  });

  return updatedTable;
};

// GET ALL TABLES
export const getTables = async () => {
  return prisma.table.findMany({
    orderBy: {
      tableNumber: "asc",
    },
  });
};
