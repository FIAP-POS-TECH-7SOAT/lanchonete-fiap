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
  canceled_at?: Date;
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
  public get canceled_at(): Date | null {
    return this.props.canceled_at || null;
  }
  public set canceled_at(canceled_at:Date) {
    this.props.canceled_at = canceled_at;
  }
}
