import { CreatePaymentService } from '@application/payment/application/use-case/process-payment';
import { Request, Response } from 'express';
import { FakePaymentGateway } from 'src/adapters/drivens/infra/providers/FakePaymentGateway';
import { GenerateCodeProvider } from 'src/adapters/drivens/infra/providers/generation-unique-code';
import PaymentRepository from 'src/adapters/drivens/infra/repositories/PaymentRepository';

import { z } from 'zod';



const paymentRepository = new PaymentRepository();
const fakePaymentGateway = new FakePaymentGateway();
const generateCodeProvider = new GenerateCodeProvider();


const createPaymentService = new CreatePaymentService(paymentRepository,fakePaymentGateway,generateCodeProvider)
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
       order_id: z.string(),
       total_amount: z.number(),
       card:z.object({
        number: z.string(),
        exp: z.string(),
        cvc: z.number(),
       })
     }); 
  
     const { order_id,total_amount,card} = checkInBodySchema.parse(req.body)
       
     const payment = await createPaymentService.execute({card,order_id,total_amount});
       
     return res.json(payment);
  }
}

export const paymentsController = new PaymentsController()



