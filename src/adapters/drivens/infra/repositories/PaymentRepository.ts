


import { IPaymentRepository } from '@application/orders/application/ports/repositories/IPaymentRepository'
import { CreatePaymentDTO } from '@application/orders/application/ports/repositories/dtos/create-payment-dto'
import { Payment } from '@application/orders/domain/payment'

import { prisma } from '@shared/lib/prisma'


export default class PaymentRepository implements IPaymentRepository {
  async findByOrderId(order_id: string): Promise<Payment | null> {
    const payment = await prisma.payment.findFirst({
      where:{
        order_id
      }
    });
    if(!payment){
      return null
    }
    return new Payment({
      code:payment.code,
      created_at:payment.created_at,
      order_id:payment.order_id,
      total_amount:Number(payment.total_amount),

    },payment.id)
  }

  async create({order_id,total_amount,code}: CreatePaymentDTO): Promise<Payment> {

    const payment = new Payment({
      order_id,
      total_amount,
      code,
      created_at:new Date()
    })
    await prisma.payment.create({
      data:{
        id:payment.id,
        order_id:payment.order_id,
        total_amount:payment.total_amount,
        code,
        created_at:payment.created_at
      }
    })

    return payment
  }

}
