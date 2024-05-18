//prettier-ignore
import {CreateOrderDTO, GetAllDTO, UpdateOrderDTO } from "@application/orders/application/ports/repositories/dtos/orderDTO"
import { Order } from "@application/orders/domain/orderEntity";

export interface IOrderRepository {
  create(data: CreateOrderDTO): Promise<Order>;
  findById(id: string): Promise<Order | null>;
  getAll(data: GetAllDTO): Promise<Order[]>;
  update(data: Order): Promise<Order>;
}
