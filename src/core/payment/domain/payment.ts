import { Entity } from "@shared/entities/entity"

export interface IPayment {
  order_id: string,
  total_amount:number
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
  public get total_amount(): number {
    return this.props.total_amount
  };

}







