
import { Payment } from "../../../entities/payment";

export interface IPaymentRepository {
  create(data: Payment): Promise<Payment>;
  update(data: Payment): Promise<Payment>;
  findByOrderId(order_id: string): Promise<Payment | null>;
  findById(id: string): Promise<Payment | null>;
  findByCode(code: string): Promise<Payment | null>;

}
