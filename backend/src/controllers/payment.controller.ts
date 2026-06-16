import { Request, Response } from "express";
import * as paymentService from "../services/payment.service";

interface Params{
  id:string;
}
// CREATE
export const create = async (req: Request, res: Response) => {
  try {
    const { orderId, method, amount } = req.body;

    const payment = await paymentService.createPayment(
      orderId,
      method,
      amount
    );

    return res.status(201).json(payment);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// GET ALL
export const findAll = async (_req: Request, res: Response) => {
  try {
    console.log("GET ALL CALLED");

    const payments = await paymentService.getPayments();

    console.log(payments);

    return res.json(payments);
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// GET BY ID
export const findOne = async (req: Request<Params>, res: Response) => {
  try {
    console.log("PAYMENT ID:", req.params.id);
    const payment = await paymentService.getPaymentById(req.params.id);

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    return res.json(payment);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};