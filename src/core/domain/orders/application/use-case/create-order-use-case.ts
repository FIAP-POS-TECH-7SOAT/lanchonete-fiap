import { Order } from "@application/domain/orders/entities/order-entity";
import { OrderRepository } from "../ports/repositories/order-repository";

import { ProductRepository } from "@application/domain/products/application/ports/repositories/IProduct-repository";
import { IClientRepository } from "@application/domain/clients/application/ports/repositories/Iclient-repository";

import { OrderProductList } from "../../entities/order-products-list";
import { AppError } from "@shared/errors/AppError";
import { OrderProduct } from "../../entities/order-products";
import { UniqueEntityID } from "@application/common/entities/unique-entity-id";
import { Client } from "@application/domain/clients/entities/client-entity";
import { Product } from "@application/domain/products/entities/product";



interface RequestProps {
  products: {
    id: string;
    amount: number;
  }[];
  client: {
    id: string,
    name: string,
    email:string,
    cpf:string
  }|null
}
interface ResponseProps {
  order:Order
}
export class CreateOrderUseCase {
  constructor(
    private productRepository: ProductRepository,
    private orderRepository: OrderRepository,
    private clientRepository: IClientRepository
  ) {}
  async execute({ client, products }: RequestProps): Promise<ResponseProps> {

    if (!!client && !!client.id){
      const hasClient = await this.clientRepository.findById(client.id);
      if(!hasClient){
        const newClient = Client.create({
          cpf:client.cpf,
          email:client.email,
          name:client.name,
          status:true
        },new UniqueEntityID(client.id))
        await this.clientRepository.create(newClient)
      }
    
    }
    
    const allProducts = await this.productRepository.findByIds(products.map(item=>item.id));
    
    if(allProducts.length !== products.length){
      throw new AppError('Algum produtos invalido, favor refazer a compra')
    }
    
    
    const allProductsObj = allProducts.reduce((acc, curr) => {

      acc.products={
        [curr.id.toString()]:curr
      }
      
      const product = products.find(prod=>curr.id.toString()===prod.id)      
      acc.total_amount = product? curr.price * product.amount: 0

      return acc;
    }, {} as {products:{[key : string]:Product},total_amount:number});

    
    const order = Order.create({
      client_id:client?.id?client.id.toString():null,
      status:'Pendente',
      code:"",
      total_amount:allProductsObj.total_amount

     
    })
    
    
    const orderProducts = products.map(item=>OrderProduct.create({
      amount:item.amount,
      order_id:order.id,
      product_id:new UniqueEntityID(item.id),
      unit_price: allProductsObj.products[item.id].price
    }))
   
    order.products = new OrderProductList(orderProducts);

    
   
    await this.orderRepository.create(order)
    
    return {
      order,
    
    };
  }
}
