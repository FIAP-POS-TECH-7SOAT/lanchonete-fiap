import { Entity } from "@application/common/entities/entity"
import { Optional } from "@application/common/entities/optional";
import { UniqueEntityID } from "@application/common/entities/unique-entity-id";

export type TPaymentStatus = 'pending' | 'approved'| 'cancelled'
export interface PaymentProps {
  order_id: UniqueEntityID,
  total_amount:number;
  code:string;
  status:TPaymentStatus;
  created_at:Date
}

export class Payment extends Entity<PaymentProps>{
  constructor(
    props: PaymentProps,
    id?: UniqueEntityID,
  ) {
    props.created_at ?? new Date()
    super(props, id)
  }

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
    )
    return payment
  }

  public get order_id(): UniqueEntityID {
    return this.props.order_id
  };
  public get created_at(): Date {
    return this.props.created_at
  };
  public get code(): string {
    return this.props.code
  };
  
  public get total_amount(): number {
    return this.props.total_amount
  };
  public get status(): TPaymentStatus {
    return this.props.status
  };
  public set status(status:TPaymentStatus) {
    this.props.status = status
  };

}







