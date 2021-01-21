import nats from "node-nats-streaming";
import { isJsxClosingFragment } from "typescript";
console.clear();
const stan = nats.connect("ticketing", "123", { url: "http://localhost:4222" });

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  const subscribtion = stan.subscribe("ticket:created");
  subscribtion.on("message", (msg) => {
    console.log("message received::::!!!!");
  });
});
