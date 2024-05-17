//prettier-ignore
import {CreateOrderDTO, UpdateOrderDTO } from "@application/orders/application/ports/repositories/dtos/orderDTO"
import { Order } from "@application/orders/domain/orderEntity";

export interface IOrderRepository {
  create(data: CreateOrderDTO): Promise<Order>;
  findById(id: string): Promise<Order | null>;
  getAll(): Promise<Order[] | null>;
  update(data: Order): Promise<Order>;
}
