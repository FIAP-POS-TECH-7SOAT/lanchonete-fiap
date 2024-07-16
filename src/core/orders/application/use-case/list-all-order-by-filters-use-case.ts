import { IOrderProduct, Order, TOrderStatus } from "@application/orders/domain/order-entity";
import { IOrderRepository } from "../ports/repositories/order-repository";
import { AppError } from "@shared/errors/AppError";



interface IRequest {
  filters: {
    status: string[];
  };
}
interface IResponse {
  orders:Order[]
}
export class ListAllOrdersByFilters {
  constructor(private orderRepository: IOrderRepository) {}
  async execute({ filters }: IRequest): Promise<IResponse> {
    
    const orders = await this.orderRepository.getAll({ filters });

    return {orders};
  }
}
