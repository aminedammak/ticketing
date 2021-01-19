import express, { Request, Response } from "express";
import { requireAuth } from "@dmk_tickets/common";

const router = express.Router();

router.post("/api/tickets", requireAuth, (req: Request, res: Response) => {
  return res.status(201).send({});
});

export { router as createTicketRouter };
