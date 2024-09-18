import { Order } from "@application/domain/orders/entities/order-entity";



import { Payment, TPaymentStatus } from "../../entities/payment";
import { UniqueEntityID } from "@application/common/entities/unique-entity-id";
import { Client } from "@application/domain/clients/entities/client-entity";
import { PaymentRepository } from "../ports/repositories/IPayment-repository";
import { PaymentGateway } from "../ports/providers/payment-gateway";
import { ProcessPaymentResponse } from "../ports/providers/dtos/process-payment-response-dto";



interface IRequest {
  order_id:string;
  total_amount:number;
  client: Client| null ,

}
interface IResponse {
  
  total_amount:number
  payment_gateway:ProcessPaymentResponse
  payment:Payment
}
export class CreatePaymentUseCase {
  constructor(

    private paymentRepository: PaymentRepository,
    private paymentGateway: PaymentGateway,

  ) {}
  async execute({ client, total_amount,order_id }: IRequest): Promise<IResponse> {


    const paymentProcessInt = await this.paymentGateway.processPayment({
      amount:total_amount,
      customer:client?{
        doc_number:client.cpf,
        email:client.email
      }:null,
      order_id
    })
 
    const payment = Payment.create({
      code:paymentProcessInt.id,
      order_id:new UniqueEntityID(order_id),
      total_amount,
      status:paymentProcessInt.status as TPaymentStatus
    })

    await this.paymentRepository.create(payment)
    
    
    return {
      total_amount,
      payment_gateway: paymentProcessInt,
      payment,
    };
  }
}
