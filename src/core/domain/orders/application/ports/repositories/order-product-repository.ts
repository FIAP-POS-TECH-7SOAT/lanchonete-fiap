import { OrderProduct } from '@application/domain/orders/entities/order-products';

export interface OrderProductRepository {
  deleteByOrderId(order_id: string): Promise<void>;
  createMany(products: OrderProduct[]): Promise<void>;
  deleteMany(products: OrderProduct[]): Promise<void>;
  findManyByOrderId(order_id: string): Promise<OrderProduct[]>;
}
