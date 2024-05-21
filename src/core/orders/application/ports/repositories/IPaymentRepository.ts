
import { Payment } from "../../../domain/payment";
import { CreatePaymentDTO } from "./dtos/create-payment-dto";


export interface IPaymentRepository {
  create(data: CreatePaymentDTO): Promise<Payment>;
  findByOrderId(order_id: string): Promise<Payment | null>;

}
