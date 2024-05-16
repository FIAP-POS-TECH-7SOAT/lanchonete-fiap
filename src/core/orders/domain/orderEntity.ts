import { Entity } from "@shared/entities/entity";

interface IOrderProduct{
  
    id:string;
    amount:number
  
}
export interface IOrder {
  products: IOrderProduct[];
  client_id: string;
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

  public get products(): IOrderProduct[] {
    return this.props.products;
  }

  public get client_id(): string {
    return this.props.client_id;
  }

  public get status(): string {
    return this.props.status;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }
}
