import { Payment, MercadoPagoConfig } from 'mercadopago';
import { IPaymentGateway } from "@application/orders/application/ports/providers/IPayment-gateway";
import { ProcessPaymentRequest } from "@application/orders/application/ports/providers/dtos/process-payment-request-dto";
import { ProcessPaymentResponse } from "@application/orders/application/ports/providers/dtos/process-payment-response-dto";
import { env } from '@shared/env';
import { AppError } from '@shared/errors/AppError';

export class MercadoPagoPixPaymentGateway implements IPaymentGateway {
  async processPayment(
    {
      amount,
      order_id,
      customer
    }: ProcessPaymentRequest
  ): Promise<ProcessPaymentResponse> {
   
    try {
      const client = new MercadoPagoConfig({ accessToken:env.PAYMENT_GATEWAY_ACCESS_TOKEN });
    const payment = new Payment(client);
    const paymentCreated = await payment.create({
      body: { 
          
          transaction_amount: amount,
          description: order_id,
          payment_method_id: 'pix',
          
          payer: customer ?{
              
              email: customer.email,
              identification: {
                  type: 'CPF',
                  number: customer.doc_number
              }
          }:{
            email:'non-valid@mail.com'
          }
      },
      requestOptions: { idempotencyKey: crypto.randomUUID() }
    })
    return {
      id:paymentCreated.id as unknown as string,
      qr_code:paymentCreated.point_of_interaction?.transaction_data?.qr_code as unknown as string,
      qr_code_base64:paymentCreated.point_of_interaction?.transaction_data?.qr_code_base64 as unknown as string,
      status:paymentCreated.status as unknown as string

    }
    } catch (error:any) {
      throw new Error(error)
      
    }
  }
}
