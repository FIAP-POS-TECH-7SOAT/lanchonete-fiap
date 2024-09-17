import { Entity } from "@application/common/entities/entity";
import { UniqueEntityID } from "@application/common/entities/unique-entity-id";

export interface OrderProductProps {
  order_id: string;
  product_id: string;
  amount: number;
  created_at: Date;
  
}

export class OrderProduct extends Entity<OrderProductProps> {
  constructor(props: OrderProductProps, id?: UniqueEntityID) {
    props.created_at ?? new Date()
    super(props, id);
  }


  public get product_id() {
    return this.props.product_id;
  }
  public set products(product_id:string) {
    this.props.product_id = product_id;
  }

  public get order_id(): string {
    return this.props.order_id;
  }
  public set order_id(order_id:string) {
    this.props.order_id = order_id;
  }

  public get amount() {
    return this.props.amount;
  }
  public set amount(amount:number) {
    this.props.amount = amount;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }

}
