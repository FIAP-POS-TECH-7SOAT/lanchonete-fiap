import { IPaymentRepository } from "@application/payment/application/ports/repositories/IPaymentRepository";
import { CreatePaymentDTO } from "@application/payment/application/ports/repositories/dtos/create-payment-dto";
import { Payment } from "@application/payment/domain/payment";

import { prisma } from '@shared/lib/prisma'


export default class PaymentRepository implements IPaymentRepository {

  async create({order_id,total_amount,code}: CreatePaymentDTO): Promise<Payment> {

    const payment = new Payment({
      order_id,
      total_amount,
    })
    await prisma.payment.create({
      data:{
        id:payment.id,
        order_id:payment.order_id,
        total_amount:payment.total_amount,
        code
      }
    })

    return payment
  }

}
