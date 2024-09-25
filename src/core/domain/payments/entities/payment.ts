import { Optional } from '@application/common/entities/optional';
import { UniqueEntityID } from '@application/common/entities/unique-entity-id';
import { PaymentCreatedEvent } from '../application/events/payment-created-event';
import { AggregateRoot } from '@application/common/entities/aggregate-root';

export type TPaymentStatus = 'pending' | 'approved' | 'cancelled';
export interface PaymentProps {
  order_id: UniqueEntityID;
  total_amount: number;
  code: string;
  status: TPaymentStatus;
  created_at: Date;
}

export class Payment extends AggregateRoot<PaymentProps> {
  static create(
    props: Optional<PaymentProps, 'created_at'>,
    id?: UniqueEntityID,
  ) {
    const payment = new Payment(
      {
        ...props,
        created_at: props.created_at ?? new Date(),
      },
      id,
    );

    const isNew = !id;

    if (isNew) {
      payment.addDomainEvent(new PaymentCreatedEvent(payment));
    }

    return payment;
  }

  public get order_id(): UniqueEntityID {
    return this.props.order_id;
  }
  public get created_at(): Date {
    return this.props.created_at;
  }
  public get code(): string {
    return this.props.code;
  }

  public get total_amount(): number {
    return this.props.total_amount;
  }
  public get status(): TPaymentStatus {
    return this.props.status;
  }
  public set status(status: TPaymentStatus) {
    this.props.status = status;
  }
}
