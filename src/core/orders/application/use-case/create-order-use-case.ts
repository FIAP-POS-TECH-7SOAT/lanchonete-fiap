import { Order } from "@application/orders/domain/order-entity";
import { IOrderRepository } from "../ports/repositories/order-repository";
import { AppError } from "@shared/errors/AppError";
import { IClientRepository } from "@application/clients/application/ports/repositories/client-repository";

import { IPaymentGateway } from "../ports/providers/IPayment-gateway";
import { ProcessPaymentResponse } from "../ports/providers/dtos/process-payment-response-dto";

interface IRequest {
  products: {
    id: string;
    amount: number;
  }[];
  client_id: string | null;
}
interface IResponse {
  order:Order,
  payment:ProcessPaymentResponse
}
export class CreateOrder {
  constructor(
    private orderRepository: IOrderRepository,
    private clientRepository: IClientRepository,
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
      status:'Pendente',

    })
    const payment = await this.paymentGateway.processPayment({
      amount:products.reduce((acc,cur)=>acc+cur.amount,0),
      customer:client?{
        doc_number:client?.cpf,
        email:client?.email
      }:null,
      order_id:order.id
    })
 


    await this.orderRepository.create(order)
    order.canceled_at = new Date();
    await this.orderRepository.update(order);
    return {
      order,
      payment
    };
  }
}
