import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Ticket } from "../../models/ticket";
import { Order, OrderStatus } from "../../models/order";

//We can add test cases of authentications like on tickets service

it("returns an error if the ticket does not exist", async () => {
  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId: mongoose.Types.ObjectId() })
    .expect(404);
});

it("returns an error if the ticket is already reserved", async () => {
  //Create a ticket
  const ticket = Ticket.build({ title: "sdfqsdf", price: 10 });
  await ticket.save();

  //Order it
  const order = Order.build({
    userId: "uuidkkdk",
    status: OrderStatus.Created,
    expiresAt: new Date(), // no matter when it expires
    ticket,
  });

  await order.save();

  //test
  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId: ticket.id })
    .expect(400);
});

it("reserves a ticket", async () => {
  //Create a ticket
  const ticket = Ticket.build({ title: "sdfqsdf", price: 10 });
  await ticket.save();

  //test
  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId: ticket.id })
    .expect(201);

  //we ca write a test that make sure that inspect the DB and make sure that the ticket is reseved
});
