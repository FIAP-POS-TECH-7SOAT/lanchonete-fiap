import { Order } from '@application/domain/orders/entities/order-entity';
import { OrderRepository } from '../ports/repositories/order-repository';

interface IRequest {
  filters: {
    status: string[];
  };
}
interface IResponse {
  orders: Order[];
}
export class ListAllOrdersByFilters {
  constructor(private orderRepository: OrderRepository) {}
  async execute({ filters }: IRequest): Promise<IResponse> {
    const orders = await this.orderRepository.getAll({ filters });

    return { orders };
  }
}
