import { TicketCreatedPublisher } from "./events/ticket-created-publisher";
import nats from "node-nats-streaming";
import { Subjects } from "./events/subjects";

console.clear();
const stan = nats.connect("ticketing", "abc", { url: "http://localhost:4222" });

stan.on("connect", () => {
  console.log("Publisher connected to NATS");

  const data = {
    id: "555",
    title: "My ticket",
    price: 10,
  };

  const publisher = new TicketCreatedPublisher(stan);
  publisher.publish(data);
});
