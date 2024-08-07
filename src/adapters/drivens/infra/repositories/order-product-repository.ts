import { prisma } from "@shared/lib/prisma";

import { IOrderProductRepository } from "@application/orders/application/ports/repositories/IOrderProduct-repository";

export default class OrderProductRepository implements IOrderProductRepository {
  async deleteByOrderId(order_id: string): Promise<void> {
    await prisma.orderProduct.deleteMany({
      where:{
        order_id
      }
    })
  }
  
}
