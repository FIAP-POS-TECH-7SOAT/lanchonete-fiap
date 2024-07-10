//prettier-ignore
import {CreateOrderDTO, GetAllDTO, GetAllResponseDTO } from "@application/orders/application/ports/repositories/dtos/order-dto"
import { Order } from "@application/orders/domain/order-entity";
export interface IOrderService {
  
  get(id: string): Promise<Order | null>;
  getAll(data: GetAllDTO): Promise<GetAllResponseDTO[]>;
  update(data: Order): Promise<Order>;
}
