import { Order } from "@application/domain/orders/entities/order-entity";
import { OrderRepository } from "../ports/repositories/order-repository";

import { IProductRepository } from "@application/domain/products/application/ports/repositories/IProduct-repository";
import { IClientRepository } from "@application/domain/clients/application/ports/repositories/Iclient-repository";

import { OrderProductList } from "../../entities/order-products-list";
import { AppError } from "@shared/errors/AppError";
import { OrderProduct } from "../../entities/order-products";
import { UniqueEntityID } from "@application/common/entities/unique-entity-id";
import { Client } from "@application/domain/clients/entities/client-entity";



interface IRequest {
  products: {
    id: string;
    amount: number;
  }[];
  client_id: string | null,
}
interface IResponse {
  order:Order,
  total_amount:number
}
export class CreateOrderUseCase {
  constructor(
    private productRepository: IProductRepository,
    private orderRepository: OrderRepository,
    private clientRepository: IClientRepository
  ) {}
  async execute({ client_id, products }: IRequest): Promise<IResponse> {

    let client:Client|null= null

    if (client_id){
      client = await this.clientRepository.findById(client_id);
      if(!client){
        throw new AppError('Cliente nao encontrado')
      }
    
    }
    
    const allProducts = await this.productRepository.findByIds(products.map(item=>item.id));

    if(allProducts.length !== products.length){
      throw new AppError('Algum produtos invalido, favor refazer a compra')
    }
    const order = Order.create({
      client_id:client?client.id.toString():null,
      status:'Pendente',
      code:"",
     
    })
    const orderProducts = products.map(item=>OrderProduct.create({amount:item.amount,order_id:order.id,product_id:new UniqueEntityID(item.id)}))
   
    order.products = new OrderProductList(orderProducts);

    const total_amount = allProducts.reduce((acc,cur)=>acc+cur.price,0);
   
    await this.orderRepository.create(order)
    
    return {
      order,
      total_amount,
    };
  }
}
