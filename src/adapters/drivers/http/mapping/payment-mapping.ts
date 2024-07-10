import { Order } from "src/core/orders/domain/order-entity";
import { Payment } from "src/core/orders/domain/payment";

//prettier-ignore
export class PaymentMapping {
  static toView({ code,created_at, id,order_id,status,total_amount}: Payment) {
    return {
      code,
      created_at, 
      id,
      order_id,
      status,
      total_amount
    };
  }
}
