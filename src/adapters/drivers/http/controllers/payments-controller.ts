import { ProcessPaymentService } from "src/core/orders/application/use-case/process-payment-use-case";
import { Request, Response } from "express";
import { FakePaymentGateway } from "src/adapters/drivens/infra/providers/fake-payment-gateway";
import { GenerateCodeProvider } from "src/adapters/drivens/infra/providers/generation-unique-code";
import PaymentRepository from "src/adapters/drivens/infra/repositories/payment-repository";
import OrderRepository from "src/adapters/drivens/infra/repositories/order-repository";

import { z } from "zod";

const paymentRepository = new PaymentRepository();
const orderRepository = new OrderRepository();
const fakePaymentGateway = new FakePaymentGateway();
const generateCodeProvider = new GenerateCodeProvider();


class PaymentsController {
  async create(req: Request, res: Response): Promise<Response> {
    /*
       #swagger.tags = ['Payments']
       #swagger.summary = 'Create a new payment'
       #swagger.parameters['Payment'] = {
           in: 'body',
           description: 'Payment info',
           required: true,
           schema: {
             total_amount: 140000,
             order_id: 'nb-order-id',
             card:{
                number: "123456789", 
                exp: "12/2020", 
                cvc: 121
              }
           }
       }
     */

    
    const checkInBodySchema = z.object({
      amount: z.number(),
      id: z.string(),
      state: z.string(),
    });

    const { amount,id,state } = checkInBodySchema.parse(req.body);

    const processPaymentService = new ProcessPaymentService(
      paymentRepository,
      generateCodeProvider,
      orderRepository
    );

    const { payment, code } = await processPaymentService.execute({
      id,
      amount,
      state
    });

    return res.json({
      1:1
    });
  }
}

export const paymentsController = new PaymentsController();
