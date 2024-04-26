
import { Payment } from "../../../domain/payment";
import { CreatePaymentDTO } from "./dtos/create-payment-dto";


export interface IPaymentRepository {
  create(data: CreatePaymentDTO): Promise<Payment>;

}
