import { UniqueEntityID } from "@application/common/entities/unique-entity-id"
import { DomainEvent } from "@application/common/events/domain-event"
import { Payment } from "../../entities/payment"



export class PaymentCreatedEvent implements DomainEvent {
  public ocurredAt: Date
  public payment: Payment

  constructor(payment: Payment) {
    this.payment = payment
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.payment.id
  }
}
