import { Order } from "@application/orders/domain/order-entity";
//prettier-ignore
import {CreateOrderDTO, GetAllDTO, GetAllResponseDTO } from "@application/orders/application/ports/repositories/dtos/order-dto"
import { IOrderRepository } from "../ports/repositories/order-repository";
import { IOrderService } from "@application/orders/application/use-case/IOrder-use-case";
import { format } from "date-fns";

export class OrderServiceImpl implements IOrderService {
  constructor(private orderRepository: IOrderRepository) {}

  async get(id: string): Promise<Order | null> {
    return await this.orderRepository.findById(id);
  }
  async getAll({ filters }: GetAllDTO): Promise<GetAllResponseDTO[]> {
    const order = await this.orderRepository.getAll({ filters });
    const myOrders = order.map((item) => ({
      ...item,
      waitTime: format(
        new Date().getTime() - item.created_at.getTime(),
        "mm:ss"
      ),
    })) as GetAllResponseDTO[];
    return myOrders;
  }
  async update(data: Order): Promise<Order> {
    return await this.orderRepository.update(data);
  }
  async create(data: CreateOrderDTO): Promise<Order> {
    return await this.orderRepository.create(data);
  }
}
