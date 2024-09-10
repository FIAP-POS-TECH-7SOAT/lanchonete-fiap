import { Order } from "src/core/orders/entities/order-entity";

//prettier-ignore
export class OrderMapping {
  static toView({ id, products, client_id, status, created_at, canceled_at,code ,waitTime}: Order) {
    return {
      id,
      client_id,
      products,
      status,
      created_at,
      canceled_at,
      code,
      waitTime
    };
  }
}
