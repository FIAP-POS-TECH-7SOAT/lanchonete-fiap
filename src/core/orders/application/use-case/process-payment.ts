import { Payment } from '../../domain/payment';

import { IPaymentGateway } from '../ports/providers/IPaymentGateway';
import { AppError } from '@shared/errors/AppError';
import { IPaymentRepository } from '../ports/repositories/IPaymentRepository';

import { IOrderRepository } from '../ports/repositories/orderRepository';
import { IGenerateCodeProvider } from '../ports/providers/IGenerateCodeProvider';


interface IRequest {
  order_id:string;  
  total_amount:number;
  card:{
    number: string, 
    exp: string, 
    cvc: number
  }

  
}
interface IResponse {
  payment:Payment;
  code:string
}



export class CreatePaymentService {
  constructor(
    private paymentRepository: IPaymentRepository,
    private paymentGateway: IPaymentGateway,
    private generateCodeProvider: IGenerateCodeProvider,
    private orderRepository: IOrderRepository
  ) {}

  public async execute({
   order_id,
   total_amount,
   card
  }: IRequest): Promise<IResponse> {
    const order = await this.orderRepository.findById(order_id);
    if(!order){
      throw new AppError('Pedido não encontrado')
    }
        
    if(!!order.canceled_at){
      throw new AppError('Pedido cancelado')
    }
    const alreadyPaid = await this.paymentRepository.findByOrderId(order_id);
    if(alreadyPaid){
      throw new AppError('Pagamento já foi efetuado')
    }
    const processPayment = await this.paymentGateway.processPayment({
      amount:total_amount,
      card
    });


    if (!processPayment.success) {
      throw new AppError(processPayment.msg);
    }
    const code = this.generateCodeProvider.generate();
    const payment = await this.paymentRepository.create({order_id,total_amount,code})
    
    order.status = "Recebido";
    await this.orderRepository.update(order);
    
    return {
      payment,
      code
    };
  }
}

