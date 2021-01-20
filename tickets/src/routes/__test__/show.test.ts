import { Mongoose } from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/tickets";
import mongoose from "mongoose";

it("returns a 404 if the ticket is not found", async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  await request(app).get(`/api/tickets/${id}`).send().expect(404);
});
it("returns the ticket if the ticket is not found", async () => {
  const title = "cinema";
  const price = 20;

  const addTicketResponse = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title, price })
    .expect(201);

  const addedTicketId = addTicketResponse.body.id;

  //make the test
  const ticketResponse = await request(app)
    .get(`/api/tickets/${addedTicketId}`)
    .send()
    .expect(200);
  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});
