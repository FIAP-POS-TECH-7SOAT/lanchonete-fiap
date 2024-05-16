import { IOrderRepository } from "@application/orders/application/ports/repositories/orderRepository";
import { Order } from "@application/orders/domain/orderEntity";
//prettier-ignore
import {CreateOrderDTO, UpdateOrderDTO } from "@application/orders/application/ports/repositories/dtos/orderDTO"

import { prisma } from "@shared/lib/prisma";

export default class OrderRepository implements IOrderRepository {
  async get(id: string): Promise<Order | null> {
    throw new Error("")
  }

  async getAll(): Promise<Order[] | null> {
    throw new Error("")
  }

  // prettier-ignore
  async update({id, client_id, product, status }: UpdateOrderDTO): Promise<Order | null> {
    throw new Error("")

  }

  // prettier-ignore
  async create({ client_id, products }: CreateOrderDTO): Promise<Order> {
    const status = "Recebido"
    const created_at = new Date()
    const order = new Order({ client_id, products, status, created_at });
    
    const orders = products.map(item=>({
      id:order.id,
      client_id,
      product_id:item.id,
      amount:item.amount

    }))
    await prisma.order.createMany({
      data: orders
    });

    return order;
  }
}
