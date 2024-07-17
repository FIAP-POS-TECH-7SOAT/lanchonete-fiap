import { IOrderProduct, Order, TOrderStatus } from "@application/orders/domain/order-entity";
import { IOrderRepository } from "../ports/repositories/order-repository";
import { AppError } from "@shared/errors/AppError";


interface IRequest {
  id: string;
  products: IOrderProduct[]
  status: TOrderStatus
}
interface IResponse {
  order:Order
}
export class UpdateOrderById {
  constructor(private orderRepository: IOrderRepository) {}
  async execute({ id, status, products }: IRequest): Promise<IResponse> {
    const order = await this.orderRepository.findById(id);
    if (!order) {
      throw new AppError("Pedido não existe");
    }
    order.status = status;
    
    order.products = products;
    await this.orderRepository.update(order);
    return {order};
  }
}
