import { ProcessPaymentRequest } from "@application/domain/orders/application/ports/providers/dtos/process-payment-request-dto";
import { ProcessPaymentResponse } from "@application/domain/orders/application/ports/providers/dtos/process-payment-response-dto";
import { IPaymentGateway } from "@application/domain/orders/application/ports/providers/IPayment-gateway";

export class FakePaymentGateway implements IPaymentGateway {
  async processPayment(
    payload: ProcessPaymentRequest
  ): Promise<ProcessPaymentResponse> {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simula uma resposta aleatória (sucesso ou falha)
    const sucesso = Math.random() < 0.5; // 50% de chance de sucesso
    if (sucesso) {
      return {
        success: false,
        msg: "Falha ao processar o pagamento com cartão.",
      };
    }
    return {
      success: true,
      msg: "Pagamento com cartão bem-sucedido!",
    };
  }
}
