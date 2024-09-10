import { Order } from "@application/domain/orders/entities/order-entity";

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
