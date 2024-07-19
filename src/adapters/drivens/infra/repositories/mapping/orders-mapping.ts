import { Order, TOrderStatus } from "@application/orders/domain/order-entity";
//prettier-ignore
import { Order as OrderPrisma, OrderProduct as OrderProductPrisma, Prisma } from "@prisma/client";

type CompleteOrderPrima = OrderPrisma & {
  products: OrderProductPrisma[];
};
export class OrderMapping {
  static toDomain({
    client_id,
    created_at,
    id,
    products,
    status,
    canceled_at,
    code
  }: CompleteOrderPrima) {
    return new Order(
      { client_id, created_at, products, status:status as TOrderStatus, canceled_at: canceled_at,code },
      id
    );
  }

  static toCreatePrisma(order: Order): Prisma.OrderCreateInput {
    const client = order.client_id?{
      connect: {
        id: order.client_id,
      },
    }:{}
    return {
      id: order.id,
      client,
      created_at: order.created_at,
      status: order.status,
      canceled_at: order.canceled_at,
      products: {
        create: order.products.map((item) => ({
          amount: item.amount,
          product_id: item.id,
        })),
      },
    };
  }
  static toPrisma(order: Order) {
    return {
      canceled_at: order.canceled_at,
      created_at: order.created_at,
      status: order.status,
      id: order.id,
      client_id: order.client_id ?? undefined,
      code:order.code
    };
  }
}
