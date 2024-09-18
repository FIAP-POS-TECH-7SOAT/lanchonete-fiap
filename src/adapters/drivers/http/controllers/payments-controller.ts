

import { FindPaymentByIdService } from "@application/domain/orders/application/use-case/find-payment-by-id-use-case";
import { Request, Response } from "express";

import { GenerateCodeProvider } from "src/adapters/drivens/infra/providers/generation-unique-code";
import PaymentRepository from "@adapters/drivens/infra/database/prisma/repositories/payment-repository";
import {PrismaOrderRepository} from "@adapters/drivens/infra/database/prisma/repositories/order-repository";
import {PrismaOrderProductRepository} from "@adapters/drivens/infra/database/prisma/repositories/order-product-repository";

import { z } from "zod";
import { env } from "@adapters/drivens/infra/env";
import { PaymentMapping } from "../mapping/payment-mapping";
import { OrderMapping } from "../mapping/order-mapping";
import { FindOrderByIdUseCase } from "@application/domain/orders/application/use-case/find-order-by-id-use-case";
import { ProcessPaymentService } from "@application/domain/orders/application/use-case/process-payment-use-case";

const paymentRepository = new PaymentRepository();

const orderProductRepository = new PrismaOrderProductRepository();
const orderRepository = new PrismaOrderRepository(orderProductRepository);

const generateCodeProvider = new GenerateCodeProvider();


class PaymentsController {
  async create(req: Request, res: Response): Promise<Response> {
    /*
       #swagger.tags = ['Payments']
       #swagger.summary = 'Create a new payment'

        #swagger.parameters['Product']  = {
          in: 'body',
          description: 'Payment info',
          required: true,
          schema:{
            amount: 140000,
            id: 'nb-order-id',
            state:'pago'
          }
        } 
     */
    
    const checkInBodySchema =  z.object({
      data: z.object({
        id:z.any()
      }),
    });

    const { data } = checkInBodySchema.parse(req.body);
    
    const response = await fetch(`https://api.mercadopago.com/v1/payments/${data.id}`,{
      headers:{
        Authorization:`Bearer ${env.PAYMENT_GATEWAY_ACCESS_TOKEN}`
      }
    })

    const toJson = await response.json()
    const processPaymentService = new ProcessPaymentService(
      paymentRepository,
      generateCodeProvider,
      orderRepository
    );

    const { payment, code } = await processPaymentService.execute({
      id:String(data.id),
      amount:toJson.transaction_amount,
      state:toJson.status
    });

    return res.json({
      payment,
      code
    });
  }
  async findPaymentById(req: Request, res: Response): Promise<Response> {
    /*
       #swagger.tags = ['Payments']
       #swagger.summary = 'Find a payment'
      
 
     */

    
    const checkInParamsSchema = z.object({
      id: z.string(),
    });

    const { id } = checkInParamsSchema.parse(req.params);

    const findPaymentByIdService = new FindPaymentByIdService(
      paymentRepository,

    );

    const { payment } = await findPaymentByIdService.execute({
      id
    });
    const findOrderByIdUseCase = new FindOrderByIdUseCase(orderRepository);
    const {order} = await findOrderByIdUseCase.execute({id:payment.order_id.toString()})
    return res.json({
      payment:PaymentMapping.toView(payment),
      order:order?OrderMapping.toView(order):null
    });
  }
}

export const paymentsController = new PaymentsController();
