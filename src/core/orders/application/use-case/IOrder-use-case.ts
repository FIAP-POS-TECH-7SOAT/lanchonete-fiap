//prettier-ignore
import {CreateOrderDTO, GetAllDTO } from "@application/orders/application/ports/repositories/dtos/order-dto"
import { Order } from "@application/orders/domain/order-entity";
export interface IOrderService {
  
  get(id: string): Promise<Order | null>;
  getAll(data: GetAllDTO): Promise<Order[] | null>;
  update(data: Order): Promise<Order>;
}
