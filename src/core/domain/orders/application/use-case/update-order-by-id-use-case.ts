import {  Order } from "@application/domain/orders/entities/order-entity";
import { IOrderRepository } from "../ports/repositories/order-repository";
import { AppError } from "@shared/errors/AppError";
import { OrderProductRepository } from "../ports/repositories/order-product-repository";
import { OrderProductList } from "../../entities/order-products-list";
import { OrderProduct } from "../../entities/order-products";
import { UniqueEntityID } from "@application/common/entities/unique-entity-id";



interface IRequest {
  id: string;
  products: {
    id:string;
    amount:number
  }[]
}
interface IResponse {
  order:Order
}
export class UpdateOrderById {
  constructor(
    private orderRepository: IOrderRepository,
    private orderProductRepository: OrderProductRepository,
  ) {}
  async execute({ id, products }: IRequest): Promise<IResponse> {
    const order = await this.orderRepository.findById(id);
    if (!order) {
      throw new AppError("Pedido não existe");
    }
    const currentOrderProducts = await this.orderProductRepository.findManyByOrderId(id);
    const orderProductList = new OrderProductList(currentOrderProducts);
    const orderProducts = products.map(item=>OrderProduct.create({order_id:new UniqueEntityID(id),amount:item.amount,product_id:new UniqueEntityID(item.id)}))
    orderProductList.update(orderProducts)
    order.products = orderProductList
  
    await this.orderRepository.update(order);
    return {order};
  }
}
