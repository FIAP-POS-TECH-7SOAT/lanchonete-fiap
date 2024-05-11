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
           description: 'order info',
           required: true,
           schema: {
             client: 'john doe',
             products: [{
              "Lanche":"Hamburguer",
              "Acompanhamento":"Batata Frita",
              "Bebida":"Suco de Laranja",
              "Sobremesa":"Pudim"
            }]
           }
       }
     */

    const checkInBodySchema = z.object({
      client: z.string(),
      products: z.string(),
    });

    const { client, products } = checkInBodySchema.parse(req.body);

    const parsedProducts = JSON.parse(products);

    const order = await orderService.create({
      client,
      products: parsedProducts,
    });

    return res.json(order);
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    /*
       #swagger.tags = ['Client']
       #swagger.summary = 'Get client'
       #swagger.parameters['Client'] = {
           in: 'body',
           description: 'Client info',
           required: true,
           schema: [
            {
             id: '975dbab0-3cee-4059-8529-2757924ca737',
             products: [{
              "Lanche":"Hamburguer",
              "Acompanhamento":"Batata Frita",
              "Bebida":"Suco de Laranja",
              "Sobremesa":"Pudim"
              }],
             client: 'john doe',
             status: 'Recebido',
             created_at: '2024-05-11'
           },
           {
             id: '975dbab0-3cee-4756-1879-2757924ca737'
             products: [{
              "Lanche":"Hamburguer",
              "Acompanhamento":"Batata Frita",
              "Bebida":"Suco de Laranja",
              "Sobremesa":"Pudim"
              }],
             client: 'john pil',
             status: 'Finalizado',
             created_at: '2024-05-11'
           }
          ]
       }
     */

    const orders = await orderService.getAll();

    return res.json(orders);
  }

  async get(req: Request, res: Response): Promise<Response> {
    /*
       #swagger.tags = ['Client']
       #swagger.summary = 'Get client'
       #swagger.parameters['Client'] = {
           in: 'body',
           description: 'Client info',
           required: true,
           schema: [
           {
             id: '975dbab0-3cee-4059-8529-2757924ca737',
             products: [{
              "Lanche":"Hamburguer",
              "Acompanhamento":"Batata Frita",
              "Bebida":"Suco de Laranja",
              "Sobremesa":"Pudim"
              }],
             client: 'john doe',
             status: 'Recebido',
             created_at: '2024-05-11'
           }
          ]
       }
     */

    const checkInBodySchema = z.object({
      id: z.string(),
    });

    const { id } = checkInBodySchema.parse(req.body);

    const order = await orderService.get(id);

    return res.json(order);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const checkInBodySchema = z.object({
      id: z.string(),
      products: z.string(),
      client: z.string(),
      status: z.string(),
    });

    const { id, products, client, status } = checkInBodySchema.parse(req.body);

    const parsedProducts = JSON.parse(products);

    const order = await orderService.update({
      id: id,
      products: parsedProducts,
      client: client,
      status: status,
    });

    return res.json(order);
  }
}

export const orderController = new OrderController();
