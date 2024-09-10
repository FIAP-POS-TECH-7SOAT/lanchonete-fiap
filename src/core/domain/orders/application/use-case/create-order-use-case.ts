import { Order } from "@application/domain/orders/entities/order-entity";
import { IOrderRepository } from "../ports/repositories/order-repository";
import { AppError } from "@shared/errors/AppError";

import { IPaymentGateway } from "../ports/providers/IPayment-gateway";
import { ProcessPaymentResponse } from "../ports/providers/dtos/process-payment-response-dto";
import { IPaymentRepository } from "../ports/repositories/IPayment-repository";
import { Payment, TPaymentStatus } from "@application/domain/orders/entities/payment";
import { IProductRepository } from "@application/domain/products/application/ports/repositories/IProduct-repository";
import { isValidEmail } from "@brazilian-utils/brazilian-utils";
import { request } from "http";

interface IRequest {
  products: {
    id: string;
    amount: number;
  }[];
  client_id: string | null;
  cpf: string | null;
  email: string | null;
}
interface IResponse {
  order:Order,
  total_amount:number
  payment_gateway:ProcessPaymentResponse
  payment:Payment
}
export class CreateOrder {
  constructor(
    private orderRepository: IOrderRepository,
    private paymentRepository: IPaymentRepository,
    private paymentGateway: IPaymentGateway,
    private productRepository: IProductRepository,
  ) {}
  async execute({ client_id, cpf, email, products }: IRequest): Promise<IResponse> {

    let client = null;
    if(client_id){
      client = { 
        cpf: cpf,
        email: email
      }

      if(!client){
        throw new AppError('Cliente não encontrado')
      }
    }
    const allProducts = await this.productRepository.findByIds(products.map(item=>item.id))
    const order = new Order({
      products,
      client_id,
      status:'Recebido',
      code:""
    })
    const total_amount = allProducts.reduce((acc,cur)=>acc+cur.price,0);
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
      status:paymentProcessInt.status as TPaymentStatus
    })
    await this.paymentRepository.create(payment)
    await this.orderRepository.create(order)
    
    
    return {
      order,
      total_amount,
      payment_gateway:paymentProcessInt,
      payment,
    };
  }
}
