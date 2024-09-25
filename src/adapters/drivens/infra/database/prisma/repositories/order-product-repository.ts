import { OrderProduct } from '@application/domain/orders/entities/order-products';
import { prisma } from '../prisma-client';

import { OrderProductRepository } from '@application/domain/orders/application/ports/repositories/order-product-repository';
import { OrderProductsMapping } from './mapping/orders-products-mapping';

export class PrismaOrderProductRepository implements OrderProductRepository {
  async findManyByOrderId(order_id: string): Promise<OrderProduct[]> {
    const orderProducts = await prisma.orderProduct.findMany({
      where: {
        order_id,
      },
    });

    return orderProducts.map(OrderProductsMapping.toDomain);
  }

  async createMany(attachments: OrderProduct[]): Promise<void> {
    if (attachments.length === 0) {
      return;
    }

    const data = OrderProductsMapping.toPrismaCreateMany(attachments);

    await prisma.orderProduct.createMany(data);
  }
  async deleteMany(products: OrderProduct[]): Promise<void> {
    if (products.length === 0) {
      return;
    }

    const productsIds = products.map((product) => {
      return product.id.toString();
    });

    await prisma.orderProduct.deleteMany({
      where: {
        id: {
          in: productsIds,
        },
      },
    });
  }
  async deleteByOrderId(order_id: string): Promise<void> {
    await prisma.orderProduct.deleteMany({
      where: {
        order_id,
      },
    });
  }
}
