import { IOrderRepository } from "@application/orders/application/ports/repositories/order-repository";
import { Order } from "@application/orders/domain/order-entity";
//prettier-ignore
import { CreateOrderDTO, GetAllDTO } from "@application/orders/application/ports/repositories/dtos/order-dto";
import { prisma } from "@shared/lib/prisma";
import { OrderMapping } from "./mapping/orders-mapping";

export default class OrderRepository implements IOrderRepository {
  async findById(id: string): Promise<Order | null> {
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        products: true,
      },
    });
    if (!order) {
      return null;
    }
    return OrderMapping.toDomain(order);
  }

  async getAll({ filters }: GetAllDTO): Promise<Order[]> {
    const statusFilters = !!filters.status.length?
    {
      status: {
        in:filters.status
      }
    }: {}
    const orders = await prisma.order.findMany({
      where: {
        ...statusFilters,
        canceled_at: {
          equals: null,
        },
      },
      include: {
        products: {
          include:{
            product:true
          }
        },
        client: true
      },
      orderBy:{
        created_at:'desc'
      }
    });

    return orders.map(OrderMapping.toDomain);
  }

  async update(order: Order): Promise<Order> {
    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: OrderMapping.toPrisma(order),
    });

    return order;
  }

  async create(order: Order): Promise<Order> {
    await prisma.order.create({
      data: OrderMapping.toCreatePrisma(order),
    });
    return order;
  }
}
