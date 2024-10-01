import { ProcessPaymentResponse } from '@application/domain/orders/application/ports/providers/dtos/process-payment-response-dto';
import { IPaymentGateway } from '@application/domain/orders/application/ports/providers/IPayment-gateway';

export class FakePaymentGateway implements IPaymentGateway {
  async processPayment(): Promise<ProcessPaymentResponse> {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simula uma resposta aleatória (sucesso ou falha)
    const sucesso = Math.random() < 0.5; // 50% de chance de sucesso
    if (sucesso) {
      return {
        id: '',
        qr_code: '',
        qr_code_base64: '',
        status: '',
      };
    }
    return {
      id: '123',
      qr_code: '123',
      qr_code_base64: '123',
      status: 'pendent',
    };
  }
}
