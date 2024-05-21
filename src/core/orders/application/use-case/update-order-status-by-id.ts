import { Order } from "@application/orders/domain/orderEntity";
import { IOrderRepository } from "../ports/repositories/orderRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    id:string;
    status:string
}
interface IResponse extends Order{}
export class UpdateOrderStatusById{
    constructor(private orderRepository: IOrderRepository) {}
    async execute({id,status}:IRequest):Promise<IResponse>{
        const order = await this.orderRepository.findById(id);
        if(!order){
            throw new AppError('Pedido não existe');
        }
        order.status = status;
        await this.orderRepository.update(order)
        return order;
    }
}