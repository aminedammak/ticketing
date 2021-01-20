import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returs a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  //try to update the ticket
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({ title: "sefsdf", price: 20 })
    .expect(404);
});

it("returs a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${id}`)
    .send({ title: "sefsdf", price: 20 })
    .expect(401);
});

it("returs a 401 if the user does not own the ticket", async () => {
  //create a ticket
  const response = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", global.signin())
    .send({ title: "sefsdf", price: 20 })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set(
      "Cookie",
      global.signin()
    ) /** Here we sign in with another user because id get dynamically generated each time signin is invoked */
    .send({ title: "edited title", price: 22 })
    .expect(401);

  /** we can also check that the ticket was not updated */
});

it("returs a 400 if the user provides an invalid title or price", async () => {
  const cookie = global.signin();
  //create a ticket
  const response = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", cookie)
    .send({ title: "sefsdf", price: 20 })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "",
      price: 22,
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "sdfsdf",
      price: -10,
    })
    .expect(400);
});

it("updates the ticket provided valid inputs", async () => {
  const cookie = global.signin();
  //create a ticket
  const response = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", cookie)
    .send({ title: "sefsdf", price: 20 })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "this is an update ticket",
      price: 50,
    })
    .expect(200);

  const updatedTicket = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send();

  expect(updatedTicket.body.title).toEqual("this is an update ticket");
  expect(updatedTicket.body.price).toEqual(50);
});
