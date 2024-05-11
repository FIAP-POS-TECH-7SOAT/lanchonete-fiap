import {
  Order,
  CreateOrderDTO,
  UpdateOrderDTO,
} from "@application/orders/domain/orderEntity";

export interface IOrderRepository {
  create(data: CreateOrderDTO): Promise<Order>;
  get(id: string): Promise<Order | null>;
  getAll(): Promise<Order[] | null>;
  update(data: UpdateOrderDTO): Promise<Order | null>;
}
