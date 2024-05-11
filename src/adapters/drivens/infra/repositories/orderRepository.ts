import { IOrderRepository } from "@application/orders/application/ports/repositories/orderRepository";
import {
  Order,
  CreateOrderDTO,
  UpdateOrderDTO,
} from "@application/orders/domain/orderEntity";

import { prisma } from "@shared/lib/prisma";

export default class OrderRepository implements IOrderRepository {
  async get(id: string): Promise<Order | null> {
    const order = await prisma.order.findUnique({ where: { id: id } });

    if (order) {
      return new Order(order);
    } else {
      return null;
    }
  }

  async getAll(): Promise<Order[] | null> {
    const orders = await prisma.order.findMany();

    if (orders.length === 0) {
      return null;
    } else {
      return orders.map((order) => new Order(order));
    }
  }

  // prettier-ignore
  async update({id, client, products, status }: UpdateOrderDTO): Promise<Order | null> {
    const order = prisma.order.update({
      where: {
        id: id,
      },
      data: {
        client,
        products,
        status,
      },
    });

    return null
  }

  // prettier-ignore
  async create({ client, products }: CreateOrderDTO): Promise<Order> {
    const status = "Recebido"
    const created_at = new Date()
    const order = new Order({ client, products, status, created_at });

    await prisma.order.create({
      data: {
        client: order.client,
        products: order.products
      },
    });

    return order;
  }
}
