import {
  Order,
  TOrderStatus,
} from '@application/domain/orders/entities/order-entity';
import { OrderRepository } from '../ports/repositories/order-repository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id: string;
  status: TOrderStatus;
}
interface IResponse extends Order {}
export class UpdateOrderStatusById {
  constructor(private orderRepository: OrderRepository) {}
  async execute({ id, status }: IRequest): Promise<IResponse> {
    const order = await this.orderRepository.findById(id);
    if (!order) {
      throw new AppError('Pedido não existe');
    }
    order.status = status;
    await this.orderRepository.update(order);
    return order;
  }
}
