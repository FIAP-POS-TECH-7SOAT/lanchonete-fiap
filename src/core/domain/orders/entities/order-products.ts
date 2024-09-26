import { Entity } from '@application/common/entities/entity';
import { UniqueEntityID } from '@application/common/entities/unique-entity-id';
import { Product } from '@application/domain/products/entities/product';

export interface OrderProductProps {
  order_id: UniqueEntityID;
  product_id: UniqueEntityID;
  amount: number;
  unit_price: number;
  product?: Product;
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
  public get product() {
    return this.props.product;
  }
  public get unit_price() {
    return this.props.unit_price;
  }
  static create(props: OrderProductProps, id?: UniqueEntityID) {
    const orderProduct = new OrderProduct(props, id);

    return orderProduct;
  }
}
