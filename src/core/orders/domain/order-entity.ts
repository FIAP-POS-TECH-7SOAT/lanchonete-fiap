import { Entity } from "@shared/entities/entity";

interface IOrderProduct{
    id:string;
    amount:number
  
}
type TOrderStatus = 'Recebido' | 'Em preparação' | 'Pronto' |'Finalizado'

export interface IOrder {
  products: IOrderProduct[];
  client_id: string | null;
  status: TOrderStatus;
  created_at?: Date;
  canceled_at?: Date | null;
  code:string
  
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

  public get client_id(): string |null {
    return this.props.client_id || null;
  }

  public get status(): TOrderStatus {
    return this.props.status;
  }
  public set status(status:TOrderStatus) {
    this.props.status = status;
  }
  public set code(code:string) {
    this.props.code = code;
  }
  public get code() {
    return this.props.code;
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
