import { OrderRepository } from '@application/domain/orders/application/ports/repositories/order-repository';
import {
  Order,
  TOrderStatus,
} from '@application/domain/orders/entities/order-entity';

import { GetAllDTO } from '@application/domain/orders/application/ports/repositories/dtos/order-dto';
import { prisma } from '../prisma-client';
import { OrderMapping } from './mapping/orders-mapping';

import { OrderProductRepository } from '@application/domain/orders/application/ports/repositories/order-product-repository';

export class PrismaOrderRepository implements OrderRepository {
  constructor(private orderProductRepository: OrderProductRepository) {}

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
    const statusOrder: TOrderStatus[] = ['Pronto', 'Em preparação', 'Recebido'];
    const statusFilters = !!filters.status.length
      ? {
          status: {
            in: filters.status,
          },
        }
      : {
          status: {
            in: statusOrder,
          },
        };
    const orders = await prisma.order.findMany({
      where: {
        ...statusFilters,
        canceled_at: {
          equals: null,
        },
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
        client: true,
      },
      orderBy: {
        created_at: 'asc',
      },
    });

    // Sort the orders based on the custom status order "statusOrder"
    // Pronto > Em preparação > Recebido
    const sortedOrders = orders.sort((a, b) => {
      return (
        statusOrder.indexOf(a.status as TOrderStatus) -
        statusOrder.indexOf(b.status as TOrderStatus)
      );
    });

    return sortedOrders.map(OrderMapping.toDomain);
  }

  async update(order: Order): Promise<Order> {
    await Promise.all([
      prisma.order.update({
        where: {
          id: order.id.toString(),
        },
        data: OrderMapping.toPrisma(order),
      }),
      this.orderProductRepository.createMany(order.products.getNewItems()),
      this.orderProductRepository.deleteMany(order.products.getRemovedItems()),
    ]);

    return order;
  }

  async create(order: Order): Promise<Order> {
    await prisma.order.create({
      data: OrderMapping.toCreatePrisma(order),
    });
    await this.orderProductRepository.createMany(order.products.getItems());
    return order;
  }
}
