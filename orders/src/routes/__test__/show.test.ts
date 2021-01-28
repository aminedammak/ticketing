import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

it("fetches the order", async () => {
  //create a ticket
  const ticket = Ticket.build({ title: "concert", price: 20 });
  await ticket.save();

  //send a request to order that ticket
  const user = global.signin();
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  //send a request to fetch that order
  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(200);

  expect(fetchedOrder.id).toEqual(order.id);
});

it("returns an error if a user tries to fetch the order of another user", async () => {
  //create a ticket
  const ticket = Ticket.build({ title: "concert", price: 20 });
  await ticket.save();

  //send a request to order that ticket
  const userOne = global.signin();
  const userTwo = global.signin();
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", userOne)
    .send({ ticketId: ticket.id })
    .expect(201);

  //Try to fetch the order or userOne with the userTwo
  await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", userTwo)
    .send()
    .expect(401);
});
