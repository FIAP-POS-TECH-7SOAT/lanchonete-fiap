import { Order } from "@application/orders/domain/orderEntity";
import { IOrderRepository } from "../ports/repositories/orderRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    id:string
}
interface IResponse extends Order{}
export class CancelOrderById{
    constructor(private orderRepository: IOrderRepository) {}
    async execute({id}:IRequest):Promise<IResponse>{
        const order = await this.orderRepository.findById(id);
        if(!order){
            throw new AppError('Pedido não existe');
        }
        order.canceled_at = new Date();
        await this.orderRepository.update(order)
        return order;
    }
}