import { Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";

interface Events {
  subject: Subjects;
  data: any;
}

export abstract class Publisher<T extends Events> {
  abstract subject: T["subject"];
  private client: Stan;
  constructor(client: Stan) {
    this.client = client;
  }
  publish(data: T["data"]) {
    this.client.publish(this.subject, JSON.stringify(data), () => {
      console.log("Event published");
    });
  }
}