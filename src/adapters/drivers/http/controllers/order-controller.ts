
import { CreateOrder } from "@application/orders/application/use-case/create-order-use-case";
import { CancelOrderById } from "@application/orders/application/use-case/cancel-order-by-id-use-case";
import { Request, Response } from "express";
import { OrderMapping } from "../mapping/order-mapping";
import { z } from "zod";
import OrderRepository from "src/adapters/drivens/infra/repositories/order-repository";
import ClientRepository from "src/adapters/drivens/infra/repositories/client-repository";
import { MercadoPagoPixPaymentGateway } from "src/adapters/drivens/infra/providers/mercado-pago-pix-payment-gateway";
import PaymentRepository from "src/adapters/drivens/infra/repositories/payment-repository";
import { PaymentMapping } from "../mapping/payment-mapping";
import ProductRepository from "src/adapters/drivens/infra/repositories/product-repository";
import { UpdateOrderById } from "@application/orders/application/use-case/update-order-by-id-use-case";
import { TOrderStatus } from "@application/orders/domain/order-entity";
import { ListAllOrdersByFilters } from "@application/orders/application/use-case/list-all-order-by-filters-use-case";
import { FindOrderByIdUseCase } from "@application/orders/application/use-case/find-order-by-id-use-case";

const orderRepository = new OrderRepository();
const productRepository = new ProductRepository();
const mercadoPagoPixPaymentGateway = new MercadoPagoPixPaymentGateway();
const clientRepository = new ClientRepository();
const paymentRepository = new PaymentRepository();


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

    const checkInBodySchema = z.object({
      client_id: z.string().optional(),
      products: z.array(
        z.object({
          id: z.string(),
          amount: z.number(),
        })
      ),
    });

    const { client_id, products } = checkInBodySchema.parse(req.body);
    const createOrder = new CreateOrder(
      orderRepository,
      clientRepository,
      paymentRepository,
      mercadoPagoPixPaymentGateway,
      productRepository
    )
    const {order,payment ,payment_gateway,total_amount} = await createOrder.execute({
      client_id:client_id?client_id:null,
      products,
    });

    return res.json({
      order:OrderMapping.toView(order),
      payment:PaymentMapping.toView(payment),
      payment_gateway,
      total_amount
    });
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
               id: '975dbab0-3cee-4059-8529-2757924ca737',
               client_id: '975dbab0-3cee-4059-8529-2757924ca737',
               products: [{
                id:'975dbab0-3cee-4059-8529-2757924ca737',
                amount:3
               }],
               status: 'Recebido'
             
           }
       }
     */

    const checkInBodySchema = z.object({
      id: z.string(),
      products: z.array(z.any()),
      status: z.string(),
      client_id: z.string(),
    });

    const { id, products, status, client_id } = checkInBodySchema.parse(
      req.body
    );
    const updateOrderById = new UpdateOrderById(orderRepository);
    const {order} = await updateOrderById.execute({
      id,
      products,
      status:status as TOrderStatus,
    });

    return res.json(OrderMapping.toView(order));
  }
  async getAll(req: Request, res: Response): Promise<Response> {
    /*
       #swagger.tags = ['Order']
       #swagger.summary = 'Get all orders'
       
     
        #swagger.parameters['obj'] = {
        in: 'query',
        description: "Possiveis filtros |Pagamento Pendente | Recebido | Em Preparacao | Pronto | Finalizado",
        name: 'status',
        type: 'array',
        items: {
          type: 'string',
          enum: ['Pagamento Pendente','Recebido', 'Em Preparacao', 'Pronto','Finalizado']
        }
      }
    */
    const checkInQueySchema = z.object({
      status: z.union([z.string(), z.array(z.string())]).optional(),
    });
    const { status } = checkInQueySchema.parse(req.query);
    const myStatus = typeof status === "string" ? [status] : status;

    const listAllOrdersByFilters = new ListAllOrdersByFilters(orderRepository)
    const {orders} = await listAllOrdersByFilters.execute({
      filters: {
        status: myStatus? myStatus.map((item) => item.trim()):[],
      },
    });

    return res.json(orders.map(OrderMapping.toView));
  }

  async get(req: Request, res: Response): Promise<Response> {
    /*
       #swagger.tags = ['Order']
       #swagger.summary = 'Get order by ID'
       #swagger.parameters['id'] = {
           in: 'path',
           description: 'Order ID',
           required: true
       }
     */

    const { id } = req.params;

    const findOrderByIdUseCase  = new FindOrderByIdUseCase(orderRepository)
    const {order} = await findOrderByIdUseCase.execute({id});


    return res.json(OrderMapping.toView(order));
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
    const order = await cancelOrderById.execute({ id });

    return res.json(OrderMapping.toView(order));
  }
}

export const orderController = new OrderController();
