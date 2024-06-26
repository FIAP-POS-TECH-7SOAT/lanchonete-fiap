import { Payment } from "../../domain/payment";


import { AppError } from "@shared/errors/AppError";
import { IPaymentRepository } from "../ports/repositories/IPayment-repository";

import { IOrderRepository } from "../ports/repositories/order-repository";
import { IGenerateCodeProvider } from "../ports/providers/IGenerate-code-provider";

interface IRequest {
  amount:number
  id:string;
  state:string
}
interface IResponse {
  payment: Payment;
  code: string;
}

export class ProcessPaymentService {
  constructor(
    private paymentRepository: IPaymentRepository,
    private generateCodeProvider: IGenerateCodeProvider,
    private orderRepository: IOrderRepository
  ) {}

  public async execute({
    amount,
    id,
    state
  }: IRequest): Promise<IResponse> {
    const payment = await this.paymentRepository.findByCode(id);
    if (!payment) {
      throw new AppError("Solicitação pagamento não encontrado");
    }

    const order = await this.orderRepository.findById(payment.order_id);
    if (!order) {
      throw new AppError("Pedido nao encontrado");
    }
    
    
    
    payment.status = state
    await this.paymentRepository.update(payment)
    
    const code = this.generateCodeProvider.generate();
    order.code = code
    order.status ="Em preparação"
    await this.orderRepository.update(order);

    return {
      payment,
      code,
    };
  }
}
