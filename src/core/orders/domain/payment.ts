import { Entity } from "@shared/entities/entity"

export interface IPayment {
  order_id: string,
  total_amount:number;
  code:string;
  status:string;
  created_at?:Date
}

export class Payment extends Entity<IPayment>{
  constructor(
    props: IPayment,
    id?: string,
  ) {
    super(props, id)
  }

  public get id(): string {
    return this._id
  };


  public get order_id(): string {
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
  public get status(): string {
    return this.props.status
  };
  public set status(status:string) {
    this.props.status = status
  };

}







