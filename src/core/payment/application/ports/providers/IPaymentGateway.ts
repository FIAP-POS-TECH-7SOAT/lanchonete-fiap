import { ProcessPaymentRequest } from "./dtos/ProcessPaymentRequest";
import { ProcessPaymentResponse } from "./dtos/ProcessPaymentResponse";

export interface IPaymentGateway {
  processPayment(payload: ProcessPaymentRequest): Promise<ProcessPaymentResponse>;
  
}
