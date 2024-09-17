import { AggregateRoot } from "@application/common/entities/aggregate-root";
import { UniqueEntityID } from "@application/common/entities/unique-entity-id";
import { Optional } from "@prisma/client/runtime/library";
import { format } from "date-fns";

export interface IOrderProduct{
    id:string;
    amount:number
  
}
export type TOrderStatus = 'Recebido' | 'Em preparação' | 'Pronto' |'Finalizado'

export interface OrderProps {
  products: IOrderProduct[];
  client_id: string | null;
  status: TOrderStatus;
  created_at: Date;
  canceled_at?: Date | null;
  code:string
}

export class Order extends AggregateRoot<OrderProps> {
  constructor(props: OrderProps, id?: UniqueEntityID) {
    props.created_at ?? new Date()
    super(props, id);
  }

  static create(
    props: Optional<OrderProps, 'created_at'|'canceled_at'>,
    id?: UniqueEntityID,
  ) {
    const order = new Order(
      {
        ...props,
        created_at: props.created_at ?? new Date(),
        canceled_at: props.canceled_at ?? null,
        
      },
      id,
    )
    return order
  }
  public get products(): IOrderProduct[] {
    return this.props.products;
  }
  public set products(products:IOrderProduct[]) {
    this.props.products = products;
  }
  public get waitTime(): string {
    return format(
      new Date().getTime() - this.props.created_at.getTime(),
      "mm:ss"
    )
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