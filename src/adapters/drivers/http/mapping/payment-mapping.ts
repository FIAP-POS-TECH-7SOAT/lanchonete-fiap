import { Payment } from '@application/domain/payments/entities/payment';

export class PaymentMapping {
  static toView(payment: Payment) {
    return {
      order_id: payment.order_id.toString(),
      id: payment.id.toString(),
      code: payment.code,
      created_at: payment.created_at,
      status: payment.status,
      total_amount: payment.total_amount,
      gateway_info: JSON.parse(payment.gateway_info),
    };
  }
}
