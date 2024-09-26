import { Payment, TPaymentStatus } from '../../entities/payment';
import { UniqueEntityID } from '@application/common/entities/unique-entity-id';
import { Client } from '@application/domain/clients/entities/client-entity';
import { PaymentRepository } from '../ports/repositories/payment-repository';
import { PaymentGateway } from '../ports/providers/payment-gateway';
import { ProcessPaymentResponse } from '../ports/providers/dtos/process-payment-response-dto';
import { IClientRepository } from '@application/domain/clients/application/ports/repositories/Iclient-repository';
import { AppError } from '@shared/errors/AppError';
import { OrderRepository } from '@application/domain/orders/application/ports/repositories/order-repository';

interface IRequest {
  order_id: string;
  client_id: string | null;
}
interface IResponse {
  total_amount: number;
  payment_gateway: ProcessPaymentResponse;
  payment: Payment;
}
export class CreatePaymentUseCase {
  constructor(
    private paymentRepository: PaymentRepository,
    private clientRepository: IClientRepository,
    private orderRepository: OrderRepository,
    private paymentGateway: PaymentGateway,
  ) {}
  async execute({ client_id, order_id }: IRequest): Promise<IResponse> {
    let client: Client | null = null;

    if (client_id) {
      client = await this.clientRepository.findById(client_id);
      if (!client) {
        throw new AppError('Cliente nao encontrado');
      }
    }
    const order = await this.orderRepository.findById(order_id);
    if (!order) {
      throw new AppError('pedido nao encontrado');
    }

    const paymentProcessInt = await this.paymentGateway.processPayment({
      amount: order.total_amount,
      customer: client
        ? {
            doc_number: client.cpf,
            email: client.email,
          }
        : null,
      order_id,
    });

    const payment = Payment.create({
      code: paymentProcessInt.id,
      order_id: new UniqueEntityID(order_id),
      total_amount: order.total_amount,
      status: paymentProcessInt.status as TPaymentStatus,
      gateway_info: JSON.stringify(paymentProcessInt),
    });

    await this.paymentRepository.create(payment);

    return {
      total_amount: order.total_amount,
      payment_gateway: paymentProcessInt,
      payment,
    };
  }
}
