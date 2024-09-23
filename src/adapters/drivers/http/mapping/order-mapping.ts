import { Order } from "@application/domain/orders/entities/order-entity";

export class OrderMapping {
  static toView({ id, products, client_id, status, created_at, canceled_at,code ,waitTime}: Order) {
    return {
      id:id.toString(),
      client_id,
      products:products.currentItems.map(product=>({
        id:product.id.toString(),
        amount: product.amount
      })),
      status,
      created_at,
      canceled_at,
      code,
      waitTime
    };
  }
}
