import { Payment } from '@application/domain/orders/entities/payment';

export class PaymentMapping {
  static toView({
    code,
    created_at,
    id,
    order_id,
    status,
    total_amount,
  }: Payment) {
    return {
      code,
      created_at,
      id,
      order_id,
      status,
      total_amount,
    };
  }
}
