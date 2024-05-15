//prettier-ignore
import {CreateOrderDTO, UpdateOrderDTO } from "@application/orders/application/ports/repositories/dtos/orderDTO"
import { Order } from "@application/orders/domain/orderEntity";
export interface IOrderService {
  create(data: CreateOrderDTO): Promise<Order>;
  get(id: string): Promise<Order | null>;
  getAll(): Promise<Order[] | null>;
  update(data: UpdateOrderDTO): Promise<Order | null>;
}
