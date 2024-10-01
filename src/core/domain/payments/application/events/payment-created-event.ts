import { UniqueEntityID } from '@application/common/entities/unique-entity-id';
import { DomainEvent } from '@application/common/events/domain-event';
import { Payment } from '../../entities/payment';

export class PaymentCreatedEvent implements DomainEvent {
  public ocurredAt: Date;
  public data: Payment;

  constructor(payment: Payment) {
    this.data = payment;
    this.ocurredAt = new Date();
  }

  getAggregateId(): UniqueEntityID {
    return this.data.id;
  }
}
