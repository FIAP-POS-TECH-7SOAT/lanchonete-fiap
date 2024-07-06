import { Order } from "@application/orders/domain/order-entity";
import { IOrderRepository } from "../ports/repositories/order-repository";
import { AppError } from "@shared/errors/AppError";
import { IClientRepository } from "@application/clients/application/ports/repositories/client-repository";

import { IPaymentGateway } from "../ports/providers/IPayment-gateway";
import { ProcessPaymentResponse } from "../ports/providers/dtos/process-payment-response-dto";
import { IPaymentRepository } from "../ports/repositories/IPayment-repository";
import { Payment } from "@application/orders/domain/payment";

interface IRequest {
  products: {
    id: string;
    amount: number;
  }[];
  client_id: string | null;
}
interface IResponse {
  order:Order,
  total_amount:number
  payment:ProcessPaymentResponse
}
export class CreateOrder {
  constructor(
    private orderRepository: IOrderRepository,
    private clientRepository: IClientRepository,
    private paymentRepository: IPaymentRepository,
    private paymentGateway: IPaymentGateway,
  ) {}
  async execute({ client_id,products }: IRequest): Promise<IResponse> {

    let client = null;
    if(client_id){
      client = await this.clientRepository.findById(client_id)
      if(!client){
        throw new AppError('Cliente não encontrado')
      }
    }

    const order = new Order({
      products,
      client_id,
      status:'Recebido',
      code:""
    })
    const total_amount = products.reduce((acc,cur)=>acc+cur.amount,0);
    const paymentProcessInt = await this.paymentGateway.processPayment({
      amount:total_amount,
      customer:client?{
        doc_number:client?.cpf,
        email:client?.email
      }:null,
      order_id:order.id
    })
 
    const payment = new Payment({
      code:paymentProcessInt.id,
      order_id:order.id,
      total_amount,
      status:paymentProcessInt.status
    })
    await this.paymentRepository.create(payment)
    await this.orderRepository.create(order)
    
    
    return {
      order,
      total_amount,
      payment:paymentProcessInt
    };
  }
}
