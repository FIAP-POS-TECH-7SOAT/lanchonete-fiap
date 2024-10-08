import { UniqueEntityID } from '@application/common/entities/unique-entity-id';
import {
  Order,
  TOrderStatus,
} from '@application/domain/orders/entities/order-entity';

import {
  Order as OrderPrisma,
  OrderProduct as OrderProductPrisma,
  Prisma,
} from '@prisma/client';

type CompleteOrderPrima = OrderPrisma & {
  products: OrderProductPrisma[];
};
export class OrderMapping {
  static toDomain({
    client_id,
    created_at,
    id,
    status,
    canceled_at,
    total_amount,
    code,
  }: CompleteOrderPrima) {
    return Order.create(
      {
        client_id,
        created_at,
        status: status as TOrderStatus,
        canceled_at: canceled_at,
        code,
        total_amount: Number(total_amount),
      },
      new UniqueEntityID(id),
    );
  }

  static toCreatePrisma(order: Order): Prisma.OrderCreateInput {
    const client = order.client_id
      ? {
          connect: {
            id: order.client_id,
          },
        }
      : {};
    return {
      id: order.id.toString(),
      client,
      created_at: order.created_at,
      status: order.status,
      canceled_at: order.canceled_at,
      total_amount: order.total_amount,
    };
  }
  static toPrisma(order: Order) {
    return {
      canceled_at: order.canceled_at,
      created_at: order.created_at,
      status: order.status,
      id: order.id.toString(),
      client_id: order.client_id ?? null,
      code: order.code,
      total_amount: order.total_amount,
    };
  }
}
