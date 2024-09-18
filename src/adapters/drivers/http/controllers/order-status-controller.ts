import { UpdateOrderStatusById } from "@application/domain/orders/application/use-case/update-order-status-by-id-use-case";
import { Request, Response } from "express";

import { z } from "zod";
import {PrismaOrderProductRepository} from "@adapters/drivens/infra/database/prisma/repositories/order-product-repository";
import {PrismaOrderRepository} from "@adapters/drivens/infra/database/prisma/repositories/order-repository";

const orderProductRepository = new PrismaOrderProductRepository();
const orderRepository = new PrismaOrderRepository(orderProductRepository);

class OrderStatusController {
  async update(req: Request, res: Response): Promise<Response> {
    /*
       #swagger.tags = ['Order']
       #swagger.summary = 'Update order status by ID'
       #swagger.parameters['id'] = {
           in: 'path',
           description: 'Order ID',
       }
     */
    /*  #swagger.parameters['obj'] = {
          in: 'query',
          description: 'Status',
          name:"status",
          enum: ['Recebido', 'Em Preparação', 'Pronto','Finalizado']
    }
  */

    const { id } = req.params;

    const checkInQueySchema = z.object({
      status: z.string(),
    });
    const { status } = checkInQueySchema.parse(req.query);

    const updateOrderStatusById = new UpdateOrderStatusById(orderRepository);
    const order = await updateOrderStatusById.execute({
      id,
      status: status?.toString() as any,
    });

    return res.json(order);
  }
}

export const orderStatusController = new OrderStatusController();
