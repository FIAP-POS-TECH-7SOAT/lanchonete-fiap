import { Entity } from "@application/common/entities/entity";
import { UniqueEntityID } from "@application/common/entities/unique-entity-id";

export interface OrderProductProps {
  order_id: UniqueEntityID;
  product_id: UniqueEntityID;
  amount: number;
 
}

export class OrderProduct extends Entity<OrderProductProps> {


  public get product_id() {
    return this.props.product_id;
  }


  public get order_id() {
    return this.props.order_id;
  }

  public get amount() {
    return this.props.amount;
  }
  static create(props: OrderProductProps, id?: UniqueEntityID) {
    const orderProduct = new OrderProduct(props, id)

    return orderProduct
  }



}
