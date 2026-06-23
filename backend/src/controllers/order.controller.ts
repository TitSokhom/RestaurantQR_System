import { Request, Response } from "express";
import * as orderService from "../services/order.service";

// TYPES (important for safety)
interface CreateOrderItem {
  foodId: string;
  quantity: number;
}

interface CreateOrderBody {
  tableId: string;
  items: CreateOrderItem[];
}

interface Params {
  id: string;
}
// CREATE ORDER
export const create = async (
  req: Request<{}, {}, CreateOrderBody>,
  res: Response,
) => {
  try {
    const { tableId, items } = req.body;

    const order = await orderService.createOrder(tableId, items);

    return res.status(201).json(order);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
  try {

  const order = await orderService.createOrder(
    req.body.tableId,
    req.body.items
  );

  res.status(201).json(order);
} catch (error: any) {
  console.error("ORDER ERROR:", error);

  res.status(400).json({
    message: error.message,
  });
}
};

// GET ALL ORDERS
export const findAll = async (_req: Request, res: Response) => {
  try {
    const orders = await orderService.getOrders();

    return res.json(orders);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
//Invice
export const invoice = async (req: Request<Params>, res: Response) => {
  const invoice = await orderService.getInvoice(req.params.id);

  res.json(invoice);
};
