import express, { Request, Response } from "express";
import {
  validateRequest,
  requireAuth,
  NotFoundError,
  OrderStatus,
} from "@dmk_tickets/common";
import { body } from "express-validator";
import mongoose from "mongoose";
import { Ticket } from "../models/ticket";
import { Order } from "../models/order";

const router = express.Router();

router.post(
  "/api/orders",
  requireAuth,
  [
    body("ticketId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("TicketId must be provided"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;

    //Find the ticket the user is trying to order in the database
    const ticketDoc = await Ticket.findById(ticketId);
    if (!ticketDoc) {
      throw new NotFoundError();
    }

    //Make sure that this ticket is not already reserved

    //Calculate an expiration date for this order

    //Build the order and save it to the database

    //Publish an event saying that an order was created

    const order = Order.build({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt: new Date(new Date().getTime() + 15 * 60),
      ticket: ticketDoc,
    });

    await order.save();

    res.send(order);
  }
);

export { router as newOrderRouter };
