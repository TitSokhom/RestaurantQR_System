// import prisma from "../config/prisma";
// import { TableStatus } from "@prisma/client";

// type CreateTableDTO = {
//   tableNumber: string;
//   capacity: number;
//   zone: string;
//   status?: TableStatus;
//   qrCode?: string;
// };

// type UpdateTableDTO = Partial<CreateTableDTO>;

// // CREATE
// export const create = async (data: CreateTableDTO) => {
//   return prisma.table.create({ data });
// };

// // GET ALL
// export const findAll = async () => {
//   return prisma.table.findMany({
//     orderBy: { tableNumber: "asc" },
//   });
// };

// // GET BY ID
// export const findById = async (id: string) => {
//   return prisma.table.findUnique({
//     where: { id },
//   });
// };

// // UPDATE
// export const update = async (id: string, data: UpdateTableDTO) => {
//   return prisma.table.update({
//     where: { id },
//     data,
//   });
// };
// // export const update = async (id: string, data: UpdateTableDTO) => {
// //   return prisma.table.update({
// //     where: { id },
// //     data: {
// //       ...(data.tableNumber && { tableNumber: data.tableNumber }),
// //       ...(data.capacity && { capacity: data.capacity }),
// //       ...(data.zone && { zone: data.zone }),
// //       ...(data.status && { status: data.status }),
// //     },
// //   });
// // };

// // DELETE
// export const remove = async (id: string) => {
//   return prisma.table.delete({
//     where: { id },
//   });
// };