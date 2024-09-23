//prettier-ignore
import {GetAllDTO } from "@application/domain/orders/application/ports/repositories/dtos/order-dto"
import { Order } from "@application/domain/orders/entities/order-entity";

export interface OrderRepository {
  create(data: Order): Promise<Order>;
  findById(id: string): Promise<Order | null>;
  getAll(data: GetAllDTO): Promise<Order[]>;
  update(data: Order): Promise<Order>;
}
