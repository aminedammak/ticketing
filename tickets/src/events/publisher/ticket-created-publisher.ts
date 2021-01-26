import { Publisher, TicketCreatedEvent, Subjects } from "@dmk_tickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
