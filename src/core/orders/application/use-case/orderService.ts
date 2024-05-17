import { Order } from "@application/orders/domain/orderEntity";
//prettier-ignore
import {CreateOrderDTO, UpdateOrderDTO } from "@application/orders/application/ports/repositories/dtos/orderDTO"
import { IOrderRepository } from "../ports/repositories/orderRepository";
import { IOrderService } from "@application/orders/application/use-case/IorderService";

export class OrderServiceImpl implements IOrderService {
  constructor(private orderRepository: IOrderRepository) {}

  async get(id: string): Promise<Order | null> {
    return await this.orderRepository.findById(id);
  }
  async getAll(): Promise<Order[] | null> {
    return await this.orderRepository.getAll();
  }
  async update(data: Order): Promise<Order> {
    return await this.orderRepository.update(data);
  }
  async create(data: CreateOrderDTO): Promise<Order> {
    return await this.orderRepository.create(data);
  }
}
