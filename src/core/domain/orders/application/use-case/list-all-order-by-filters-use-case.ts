import { Order } from '@application/domain/orders/entities/order-entity';
import { OrderRepository } from '../ports/repositories/order-repository';
import { Logger } from '@application/common/ports/logger';

interface IRequest {
  filters: {
    status: string[];
  };
}
interface IResponse {
  orders: Order[];
}
export class ListAllOrdersByFilters {
  constructor(
    private logger: Logger,
    private orderRepository: OrderRepository,
  ) {}
  async execute({ filters }: IRequest): Promise<IResponse> {
    this.logger.info(`Listagem de pedidos com os status: ${filters.status}`);

    const orders = await this.orderRepository.getAll({ filters });

    return { orders };
  }
}
