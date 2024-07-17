

import { AppError } from "@shared/errors/AppError";

import { IOrderRepository } from "../ports/repositories/order-repository";
import { Order } from "@application/orders/domain/order-entity";

interface IRequest {
  
  id:string;
  
}
interface IResponse {
  order: Order;
}

export class FindOrderByIdUseCase {
  constructor(
    private orderRepository: IOrderRepository,
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
