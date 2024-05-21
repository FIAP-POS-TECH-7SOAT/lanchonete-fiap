import { IPaymentGateway } from "@application/orders/application/ports/providers/IPaymentGateway";
import { ProcessPaymentRequest } from "@application/orders/application/ports/providers/dtos/ProcessPaymentRequest";
import { ProcessPaymentResponse } from "@application/orders/application/ports/providers/dtos/ProcessPaymentResponse";




export class FakePaymentGateway implements IPaymentGateway {
  async processPayment(payload: ProcessPaymentRequest): Promise<ProcessPaymentResponse> {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
      // Simula uma resposta aleatória (sucesso ou falha)
      const sucesso = Math.random() < 0.5; // 50% de chance de sucesso
      if (sucesso) {
        return {
          success:false,
          msg:'Falha ao processar o pagamento com cartão.'
        }
      } 
      return {
        success:true,
        msg:'Pagamento com cartão bem-sucedido!'
      }
  }

}


