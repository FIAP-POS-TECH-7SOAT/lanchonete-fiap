import { ProcessPaymentService } from "src/core/orders/application/use-case/process-payment-use-case";
import { OrderServiceImpl } from "src/core/orders/application/use-case/order-use-case";
import { FindPaymentByIdService } from "src/core/orders/application/use-case/find-payment-by-id-use-case";
import { Request, Response } from "express";
import { FakePaymentGateway } from "src/adapters/drivens/infra/providers/fake-payment-gateway";
import { GenerateCodeProvider } from "src/adapters/drivens/infra/providers/generation-unique-code";
import PaymentRepository from "src/adapters/drivens/infra/repositories/payment-repository";
import OrderRepository from "src/adapters/drivens/infra/repositories/order-repository";

import { z } from "zod";
import { env } from "@shared/env";
import { PaymentMapping } from "../mapping/payment-mapping";
import { OrderMapping } from "../mapping/order-mapping";

const paymentRepository = new PaymentRepository();

const orderRepository = new OrderRepository();

const generateCodeProvider = new GenerateCodeProvider();


class PaymentsController {
  async create(req: Request, res: Response): Promise<Response> {
    /*
       #swagger.tags = ['Payments']
       #swagger.summary = 'Create a new payment'
       #swagger.requestBody = {
           
           description: 'Payment info',
           required: true,
           content:{
            "application/json":{
              schema: {
                amount: 140000,
                id: 'nb-order-id',
                state:'pago'
              }
            }
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
    const orderServiceImpl = new OrderServiceImpl(orderRepository);
    const order = await orderServiceImpl.get(payment.order_id)
    return res.json({
      payment:PaymentMapping.toView(payment),
      order:order?OrderMapping.toView(order):null
    });
  }
}

export const paymentsController = new PaymentsController();
