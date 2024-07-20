import { IOrderProduct, Order, TOrderStatus } from "@application/orders/domain/order-entity";
import { IOrderRepository } from "../ports/repositories/order-repository";
import { AppError } from "@shared/errors/AppError";
import { IOrderProductRepository } from "../ports/repositories/IOrderProduct-repository";


interface IRequest {
  id: string;
  products: IOrderProduct[]
}
interface IResponse {
  order:Order
}
export class UpdateOrderById {
  constructor(
    private orderRepository: IOrderRepository,
    private orderProductRepository:IOrderProductRepository
  ) {}
  async execute({ id, products }: IRequest): Promise<IResponse> {
    const order = await this.orderRepository.findById(id);
    if (!order) {
      throw new AppError("Pedido não existe");
    }
    
    order.products = products;
    await this.orderProductRepository.deleteByOrderId(id)
    await this.orderRepository.update(order);
    return {order};
  }
}
