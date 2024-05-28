//prettier-ignore
import {CreateOrderDTO, GetAllDTO } from "@application/orders/application/ports/repositories/dtos/order-dto"
import { Order } from "@application/orders/domain/order-entity";

export interface IOrderRepository {
  create(data: CreateOrderDTO): Promise<Order>;
  findById(id: string): Promise<Order | null>;
  getAll(data: GetAllDTO): Promise<Order[]>;
  update(data: Order): Promise<Order>;
}
