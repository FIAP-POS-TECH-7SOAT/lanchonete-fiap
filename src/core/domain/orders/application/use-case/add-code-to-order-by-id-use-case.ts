import { Order } from '@application/domain/orders/entities/order-entity';
import { OrderRepository } from '../ports/repositories/order-repository';
import { AppError } from '@shared/errors/AppError';

import { IGenerateCodeProvider } from '../ports/providers/IGenerate-code-provider';

interface IRequest {
  id: string;
}
interface IResponse {
  order: Order;
}
export class AddCodeToOrderByIdUseCase {
  constructor(
    private orderRepository: OrderRepository,
    private generateCodeProvider: IGenerateCodeProvider,
  ) {}
  async execute({ id }: IRequest): Promise<IResponse> {
    const order = await this.orderRepository.findById(id);
    if (!order) {
      throw new AppError('Pedido não existe');
    }
    const code = this.generateCodeProvider.generate();
    order.code = code;

    await this.orderRepository.update(order);
    return { order };
  }
}
