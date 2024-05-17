import { OrderServiceImpl } from "@application/orders/application/use-case/orderService";
import { CancelOrderById } from "@application/orders/application/use-case/cancel-order-by-id";
import { Request, Response } from "express";

import { z } from "zod";
import OrderRepository from "src/adapters/drivens/infra/repositories/orderRepository";

const orderRepository = new OrderRepository();
const orderService = new OrderServiceImpl(orderRepository);

class OrderController {
  async create(req: Request, res: Response): Promise<Response> {
    /*
       #swagger.tags = ['Order']
       #swagger.summary = 'Create a new order'
       #swagger.parameters['Order'] = {
           in: 'body',
           description: 'Order info',
           required: true,
           schema: {
             client_id: 'fd1e95e9-ab3e-462e-9b0c-246267ac2567',
               products: [
                {
                  id:'fd1e95e9-ab3e-462e-9b0c-246267ac2567',
                  amount:2
                }
               ]
             },
             
           }
       }
     */

    const checkInBodySchema =   z.object({
      client_id: z.string(),
      products: z.array(z.object({
        id:z.string(),
        amount:z.number()
      })),
    });

    const { client_id, products } = checkInBodySchema.parse(req.body);

    const order = await orderService.create({
      client_id,
      products,
    });

    return res.json(order);
  }
  async update(req: Request, res: Response): Promise<Response | null> {
    /*
       #swagger.tags = ['Order']
       #swagger.summary = 'Update order'
       #swagger.parameters['Order'] = {
           in: 'body',
           description: 'Order info',
           required: true,
           schema: {
             properties: {
               id: { type: 'string' },
               client: { type: 'string' },
               products: {
                 type: 'array',
                 items: {
                   type: 'object',
                   properties: {
                     Lanche: { type: 'string' },
                     Acompanhamento: { type: 'string' },
                     Bebida: { type: 'string' },
                     Sobremesa: { type: 'string' }
                   }
                 }
               },
               status: { type: 'string' }
             },
             example: {
               id: '975dbab0-3cee-4059-8529-2757924ca737',
               client: 'john doe',
               products: [{
                 Lanche: 'Hamburguer',
                 Acompanhamento: 'Batata Frita',
                 Bebida: 'Suco de Laranja',
                 Sobremesa: 'Pudim'
               }],
               status: 'Recebido'
             }
           }
       }
     */

    const checkInBodySchema = z.object({
      id: z.string(),
      products: z.string(),
      status: z.string(),
      client_id: z.string(),
    });

    const { id, products, status, client_id } = checkInBodySchema.parse(req.body);

    // const orderUpdated = await orderService.update({
    //   id,
    //   products,
    //   status,
    //   client_id,
    // });

    return res.json({});
  }
  async getAll(req: Request, res: Response): Promise<Response> {
    /*
       #swagger.tags = ['Order']
       #swagger.summary = 'Get all orders'
       
     */

    const orders = await orderService.getAll();

    return res.json(orders);
  }

  async get(req: Request, res: Response): Promise<Response> {
    /*
       #swagger.tags = ['Order']
       #swagger.summary = 'Get order by ID'
       #swagger.parameters['id'] = {
           in: 'path',
           description: 'Order ID',
           required: true,
           schema: {
             type: 'string',
             example: '975dbab0-3cee-4059-8529-2757924ca737'
           }
       }
     */

    const { id } = req.params;

    const order = await orderService.get(id);

    return res.json(order);
  }
  
  async cancelOrder(req: Request, res: Response): Promise<Response> {
    /*
       #swagger.tags = ['Order']
       #swagger.summary = 'Cancel order by ID'
       #swagger.parameters['id'] = {
           in: 'path',
           description: 'Order ID',
       }
     */

    const { id } = req.params;
    const cancelOrderById = new CancelOrderById(orderRepository);
    const order = await cancelOrderById.execute({id});

    return res.json(order);
  }

  
}

export const orderController = new OrderController();
