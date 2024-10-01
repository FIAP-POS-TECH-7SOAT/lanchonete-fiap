import { IGenerateCodeProvider } from '@application/domain/orders/application/ports/providers/IGenerate-code-provider';

import { OrderRepository } from '@application/domain/orders/application/ports/repositories/order-repository';
import { Payment, TPaymentStatus } from '../../entities/payment';

import { AppError } from '@shared/errors/AppError';
import { PaymentRepository } from '../ports/repositories/payment-repository';

interface IRequest {
  amount: number;
  id: string;
  state: TPaymentStatus;
}
interface IResponse {
  payment: Payment;
  code: string;
}

export class ProcessPaymentService {
  constructor(
    private paymentRepository: PaymentRepository,
    private generateCodeProvider: IGenerateCodeProvider,
    private orderRepository: OrderRepository,
  ) {}

  public async execute({ id, state }: IRequest): Promise<IResponse> {
    const payment = await this.paymentRepository.findByCode(id);
    if (!payment) {
      throw new AppError('Solicitação pagamento não encontrado');
    }

    const order = await this.orderRepository.findById(
      payment.order_id.toString(),
    );
    if (!order) {
      throw new AppError('Pedido nao encontrado');
    }

    payment.status = state;
    await this.paymentRepository.update(payment);
    if (payment.status !== 'approved') {
      return {
        payment,
        code: '',
      };
    }

    const code = this.generateCodeProvider.generate();
    order.code = code;
    order.status = 'Recebido';
    await this.orderRepository.update(order);

    return {
      payment,
      code,
    };
  }
}
