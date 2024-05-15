import { OrderServiceImpl } from "@application/orders/application/service/orderService";
import { Request, Response } from "express";
import OrderRepository from "src/adapters/drivens/infra/repositories/orderRepository";
import { z } from "zod";

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
             properties: {
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
               }
             },
             example: {
               client: 'john doe',
               products: [{
                 Lanche: 'Hamburguer',
                 Acompanhamento: 'Batata Frita',
                 Bebida: 'Suco de Laranja',
                 Sobremesa: 'Pudim'
               }]
             }
           }
       }
     */

    const checkInBodySchema = z.object({
      client: z.string(),
      products: z.string(),
    });

    const { client, products } = checkInBodySchema.parse(req.body);

    const order = await orderService.create({
      client,
      products,
    });

    return res.json(order);
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    /*
       #swagger.tags = ['Order']
       #swagger.summary = 'Get all orders'
       #swagger.parameters['Order'] = {
           in: 'path',
           description: 'Order info',
           schema: {
             type: 'array',
             items: {
               type: 'object',
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
                 status: { type: 'string' },
                 created_at: { type: 'string' }
               }
             }
           }
       }
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
      client: z.string(),
    });

    const { id, products, status, client } = checkInBodySchema.parse(req.body);

    const orderUpdated = await orderService.update({
      id: id,
      products: products,
      status: status,
      client: client,
    });

    return res.json(orderUpdated);
  }
}

export const orderController = new OrderController();
