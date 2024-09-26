import { AppError } from '@shared/errors/AppError';

import { OrderRepository } from '../ports/repositories/order-repository';
import { Order } from '@application/domain/orders/entities/order-entity';
import { OrderProductRepository } from '../ports/repositories/order-product-repository';
import { OrderProduct } from '../../entities/order-products';

import { OrderProductList } from '../../entities/order-products-list';

interface IRequest {
  id: string;
}
interface IResponse {
  order: Order;
}

export class FindOrderByIdUseCase {
  constructor(
    private orderRepository: OrderRepository,
    private orderProductRepository: OrderProductRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<IResponse> {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new AppError('Pedido não encontrado');
    }
    const orderProduct =
      await this.orderProductRepository.findManyByOrderId(id);

    const orderProducts = orderProduct.map((item) =>
      OrderProduct.create(
        {
          amount: item.amount,
          order_id: order.id,
          product_id: item.product_id,
          unit_price: item.unit_price,
          product: item.product,
        },
        item.id,
      ),
    );
    order.products = new OrderProductList(orderProducts);
    return {
      order,
    };
  }
}
