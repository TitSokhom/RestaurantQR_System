import prisma from "../config/prisma";
import { PaymentMethod, PaymentStatus } from "@prisma/client";

// CREATE PAYMENT
export const createPayment = async (
  orderId: string,
  method: PaymentMethod,
  amount: number,
) => {
  // 1. check order exists
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  // 2. create payment
  const payment = await prisma.payment.create({
    data: {
      orderId,
      amount,
      method,
      status: PaymentStatus.PAID,
    },
  });

  // 3. update order status -> PAID
  await prisma.order.update({
    where: { id: orderId },
    data: {
      status: "PAID",
    },
  });

  return payment;
};
//Get payment all
// export const getPayments = async () => {
//   return prisma.payment.findMany({
//     include: {
//       order: {
//         include: {
//           table: true,
//         },
//       },
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//   });
// };

// export const getPayments = async () => {
//   return prisma.payment.findMany({
//     include: {
//       order: true,
//     },
//   });
// };
export const getPayments = async () => {
  return prisma.payment.findMany({
    select:{
      id:true,
      amount:true,
      method:true,
      order:{
        select:{
          id:true,
          status:true,
        }
      }
    }
  });
};
//Get payment By ID
export const getPaymentById = async (id: string) => {
  console.log("Searching Payment ID:", id);

  const payment = await prisma.payment.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });

  console.log("Found:", payment);

  return payment;
};
