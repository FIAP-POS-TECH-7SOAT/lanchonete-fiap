

import { AppError } from "@shared/errors/AppError";

import { OrderRepository } from "../ports/repositories/order-repository";
import { Order } from "@application/domain/orders/entities/order-entity";

interface IRequest {
  
  id:string;
  
}
interface IResponse {
  order: Order;
}

export class FindOrderByIdUseCase {
  constructor(
    private orderRepository: OrderRepository,
  ) {}

  public async execute({
    id,    
  }: IRequest): Promise<IResponse> {
    const order = await this.orderRepository.findById(id);
   
    if (!order) {
      throw new AppError("Pedido não encontrado");
    }
    
    return {
      order,
    };
  }
}
