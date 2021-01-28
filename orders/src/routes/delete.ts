import express, { Request, Response } from "express";
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from "@dmk_tickets/common";
import { Order, OrderStatus } from "../models/order";

const router = express.Router();

router.delete(
  "/api/orders/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    //does the order exists
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      throw new NotFoundError();
    }

    //does the currentUser own the order
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    //turn the order status into cancelled
    order.status = OrderStatus.Cancelled;

    await order.save();

    res.status(204).send(order);
  }
);

export { router as deleteOrderRouter };
