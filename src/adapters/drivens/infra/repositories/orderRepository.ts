import { IOrderRepository } from "@application/orders/application/ports/repositories/orderRepository";
import { Order } from "@application/orders/domain/orderEntity";

import {CreateOrderDTO, UpdateOrderDTO } from "@application/orders/application/ports/repositories/dtos/orderDTO"

import { prisma } from "@shared/lib/prisma";
import { OrderMapping } from "./mapping/orders-mapping";


export default class OrderRepository implements IOrderRepository {
  
  async findById(id: string): Promise<Order | null> {
    const order = await prisma.order.findUnique({
      where:{
        id,
      },
      include:{
        products:true
      }
    });
    if(!order){
      return null;
    }
    return OrderMapping.toDomain(order)
  }

  async getAll(): Promise<Order[]> {
    const orders = await prisma.order.findMany({
      include:{
        products:true
      }
    });
  
    return orders.map(OrderMapping.toDomain);
  
  }

  
  async update(order: Order): Promise<Order> {
    
    await prisma.order.update({
      where:{
        id:order.id
      },
      data:OrderMapping.toPrisma(order)
    })

    return order;

  }

  
  async create({ client_id, products }: CreateOrderDTO): Promise<Order> {
    const status = "Recebido"
    const created_at = new Date()
    const order = new Order({ client_id, products, status, created_at });
    
    
    await prisma.order.create({
      data:OrderMapping.toCreatePrisma(order)
    })
    return order;
  }
}

