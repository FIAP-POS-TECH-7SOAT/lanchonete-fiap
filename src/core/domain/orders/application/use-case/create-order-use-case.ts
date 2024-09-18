import { Order } from "@application/domain/orders/entities/order-entity";
import { IOrderRepository } from "../ports/repositories/order-repository";


import { IPaymentGateway } from "../ports/providers/IPayment-gateway";
import { ProcessPaymentResponse } from "../ports/providers/dtos/process-payment-response-dto";
import { IPaymentRepository } from "../ports/repositories/IPayment-repository";
import { Payment, TPaymentStatus } from "../../entities/payment";
import { IProductRepository } from "@application/domain/products/application/ports/repositories/IProduct-repository";
import { IClientRepository } from "@application/domain/clients/application/ports/repositories/Iclient-repository";
import { CreateClientDTO } from "@application/domain/clients/application/ports/repositories/dtos/client-dto";
import { OrderProductList } from "../../entities/order-products-list";
import { AppError } from "@shared/errors/AppError";
import { OrderProduct } from "../../entities/order-products";
import { UniqueEntityID } from "@application/common/entities/unique-entity-id";



interface IRequest {
  products: {
    id: string;
    amount: number;
  }[];
  client_id: string | null,
  cpf: string | null,
  email: string | null,
  name: string | null
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
    private clientRepository: IClientRepository
  ) {}
  async execute({ client_id, cpf, email, name, products }: IRequest): Promise<IResponse> {

    let client = null;

    if (client_id){
      client = await this.clientRepository.findById(client_id);

      if(!client) {
        const client:CreateClientDTO = {
          id: client_id,
          cpf: cpf,
          email: email,
          name: name
        }
        await this.clientRepository.create(client);
      }
    }
    
    const allProducts = await this.productRepository.findByIds(products.map(item=>item.id));

    if(allProducts.length !== products.length){
      throw new AppError('Algum produtos invalido, favor refazer a compra')
    }
    const order = Order.create({
      client_id,
      status:'Recebido',
      code:"",
     
    })
    const orderProducts = products.map(item=>OrderProduct.create({amount:item.amount,order_id:order.id,product_id:new UniqueEntityID(item.id)}))
   
    order.products = new OrderProductList(orderProducts);

    const total_amount = allProducts.reduce((acc,cur)=>acc+cur.price,0);
    // const paymentProcessInt = await this.paymentGateway.processPayment({
    //   amount:total_amount,
    //   customer:client?{
    //     doc_number:client.cpf,
    //     email:client.email
    //   }:null,
    //   order_id:order.id.toString()
    // })
 
    // const payment = Payment.create({
    //   code:paymentProcessInt.id,
    //   order_id:order.id,
    //   total_amount,
    //   status:paymentProcessInt.status as TPaymentStatus
    // })

    await Promise.all([
      // this.paymentRepository.create(payment), 
      // this.orderRepository.create(order)
    ]);
    
    return {
      order,
      total_amount,
      payment_gateway:{} as any,//paymentProcessInt,
      payment:{} as any,
    };
  }
}
