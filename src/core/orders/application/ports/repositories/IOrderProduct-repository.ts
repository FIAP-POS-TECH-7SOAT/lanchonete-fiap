export interface IOrderProductRepository {
  deleteByOrderId(order_id: string): Promise<void>;
}
