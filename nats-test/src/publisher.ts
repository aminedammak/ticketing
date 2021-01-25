import { TicketCreatedPublisher } from "./events/ticket-created-publisher";
import nats from "node-nats-streaming";
import { Subjects } from "./events/subjects";

console.clear();
const stan = nats.connect("ticketing", "abc", { url: "http://localhost:4222" });

stan.on("connect", async () => {
  console.log("Publisher connected to NATS");

  const publisher = new TicketCreatedPublisher(stan);
  try {
    await publisher.publish({
      id: "555",
      title: "My ticket",
      price: 10,
    });
  } catch (err) {
    console.error(err);
  }
});
