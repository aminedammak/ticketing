import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { Order } from "../../models/order";

const buildTicket = async () => {
  const ticket = Ticket.build({ title: "concert", price: 20 });
  await ticket.save();
  return ticket;
};

it("fetches orders for a particular user", async () => {
  //create three tickets
  const ticketOne = await buildTicket();
  const ticketTwo = await buildTicket();
  const ticketThree = await buildTicket();

  const userOne = global.signin();
  const userTwo = global.signin();

  //create one order as User #1
  await request(app)
    .post("/api/orders")
    .set("Cookie", userOne)
    .send({ ticketId: ticketOne.id })
    .expect(201);

  //create two orders as User #2
  const { body: orderOne } = await request(app)
    .post("/api/orders")
    .set("Cookie", userTwo)
    .send({ ticketId: ticketTwo.id })
    .expect(201);
  const { body: orderTwo } = await request(app)
    .post("/api/orders")
    .set("Cookie", userTwo)
    .send({ ticketId: ticketThree.id })
    .expect(201);

  //make request to get orders for user #2
  const ordersUser2 = await request(app)
    .get("/api/orders")
    .set("Cookie", userTwo)
    .expect(200);

  //make sure that we only get order of user #2
  expect(ordersUser2.body.length).toEqual(2);
  expect(ordersUser2.body[0].id).toEqual(orderOne.id);
  expect(ordersUser2.body[1].id).toEqual(orderTwo.id);
  expect(ordersUser2.body[0].ticket.id).toEqual(ticketTwo.id);
  expect(ordersUser2.body[1].ticket.id).toEqual(ticketThree.id);
});
