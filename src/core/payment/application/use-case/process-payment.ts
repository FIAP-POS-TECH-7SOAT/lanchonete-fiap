import { Payment } from '../../domain/payment';

import { IPaymentGateway } from '../ports/providers/IPaymentGateway';
import { AppError } from '@shared/errors/AppError';
import { IPaymentRepository } from '../ports/repositories/IPaymentRepository';



interface IRequest {
  order_id:string;  
  total_amount:number;
  card:{
    number: string, 
    exp: string, 
    cvc: number
  }

  
}
interface IResponse extends Payment{}



export class CreatePaymentService {
  constructor(
    private paymentRepository: IPaymentRepository,
    private paymentGateway: IPaymentGateway,
  ) {}

  public async execute({
   order_id,
   total_amount,
   card
  }: IRequest): Promise<IResponse> {
    const processPayment = await this.paymentGateway.processPayment({
      amount:total_amount,
      card
    });


    if (!processPayment.success) {
      throw new AppError(processPayment.msg);
    }
    const payment = await this.paymentRepository.create({order_id,total_amount})

    
    return payment;
  }
}

