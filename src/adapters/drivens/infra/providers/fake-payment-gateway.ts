import { IPaymentGateway } from "@application/orders/application/ports/providers/IPayment-gateway";
import { ProcessPaymentRequest } from "@application/orders/application/ports/providers/dtos/process-payment-request-dto";
import { ProcessPaymentResponse } from "@application/orders/application/ports/providers/dtos/process-payment-response-dto";
import { AppError } from "@shared/errors/AppError";

export class FakePaymentGateway implements IPaymentGateway {
  async processPayment(
    payload: ProcessPaymentRequest
  ): Promise<ProcessPaymentResponse> {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simula uma resposta aleatória (sucesso ou falha)
    const sucesso = Math.random() < 0.5; // 50% de chance de sucesso
    if (sucesso) {
      return {
        id:crypto.randomUUID(),
        qr_code:'QR-CODE-PIX',
        qr_code_base64:'QR-CODE-IMAGE',
        status:'pending'
      };
    }
    throw new AppError('Não foi possivel gerar pagamento',402)
  }
}
