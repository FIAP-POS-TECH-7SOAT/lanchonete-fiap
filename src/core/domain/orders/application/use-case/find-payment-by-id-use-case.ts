import { Payment } from "../../entities/payment";


import { AppError } from "@shared/errors/AppError";
import { IPaymentRepository } from "../ports/repositories/IPayment-repository";

import { IOrderRepository } from "../ports/repositories/order-repository";
import { IGenerateCodeProvider } from "../ports/providers/IGenerate-code-provider";

interface IRequest {
  
  id:string;
  
}
interface IResponse {
  payment: Payment;
}

export class FindPaymentByIdService {
  constructor(
    private paymentRepository: IPaymentRepository,
  ) {}

  public async execute({
    id,    
  }: IRequest): Promise<IResponse> {
    const payment = await this.paymentRepository.findById(id);
   
    if (!payment) {
      throw new AppError("Pagamento não encontrado");
    }
    
    return {
      payment,
    };
  }
}
