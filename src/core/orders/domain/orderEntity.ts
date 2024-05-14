import { Entity } from "@shared/entities/entity";

export interface IOrder {
  products: string;
  client: string;
  status: string;
  created_at: Date;
}

export class Order extends Entity<IOrder> {
  constructor(props: IOrder, id?: string) {
    super(props, id);
  }

  public get id(): string {
    return this._id;
  }

  public get products(): string {
    return this.props.products;
  }

  public get client(): string {
    return this.props.client;
  }

  public get status(): string {
    return this.props.status;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }
}
