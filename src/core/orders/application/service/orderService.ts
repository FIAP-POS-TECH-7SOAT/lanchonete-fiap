import {
  Order,
  CreateOrderDTO,
  UpdateOrderDTO,
} from "@application/orders/domain/orderEntity";
import { IOrderRepository } from "../ports/repositories/orderRepository";
import { IOrderService } from "@application/orders/application/service/IorderService";

export class OrderServiceImpl implements IOrderService {
  constructor(private orderRepository: IOrderRepository) {}

  async get(id: string): Promise<Order | null> {
    return await this.orderRepository.get(id);
  }
  async getAll(): Promise<Order | null> {
    return await this.orderRepository.getAll();
  }
  async update(data: UpdateOrderDTO): Promise<Order | null> {
    return await this.orderRepository.update(data);
  }
  async create(data: CreateOrderDTO): Promise<Order> {
    return await this.orderRepository.create(data);
  }
}
