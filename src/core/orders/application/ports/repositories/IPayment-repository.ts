
import { Payment } from "../../../domain/payment";
import { CreatePaymentDTO } from "./dtos/create-payment-dto";


export interface IPaymentRepository {
  create(data: CreatePaymentDTO): Promise<Payment>;
  update(data: Payment): Promise<Payment>;
  findByOrderId(order_id: string): Promise<Payment | null>;
  findById(id: string): Promise<Payment | null>;
  findByCode(code: string): Promise<Payment | null>;

}
