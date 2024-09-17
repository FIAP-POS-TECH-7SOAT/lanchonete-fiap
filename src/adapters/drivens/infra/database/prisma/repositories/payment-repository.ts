import { IPaymentRepository } from "@application/domain/orders/application/ports/repositories/IPayment-repository";

import { Payment, TPaymentStatus } from "@application/domain/orders/entities/payment";


import { UniqueEntityID } from "@application/common/entities/unique-entity-id";
import { prisma } from "../prisma-client";

export default class PaymentRepository implements IPaymentRepository {
  
  async findByOrderId(order_id: string): Promise<Payment | null> {
    const payment = await prisma.payment.findFirst({
      where: {
        order_id,
      },
    });
    if (!payment) {
      return null;
    }
    return new Payment(
      {
        code: payment.code,
        created_at: payment.created_at,
        order_id: new UniqueEntityID(payment.order_id),
        total_amount: Number(payment.total_amount),
        status:payment.status as TPaymentStatus
      },
      new UniqueEntityID(payment.id)
    );
  }
  async findById(id: string): Promise<Payment | null> {
    const payment = await prisma.payment.findFirst({
      where: {
        id,
      },
    });
    if (!payment) {
      return null;
    }
    return new Payment(
      {
        code: payment.code,
        created_at: payment.created_at,
        order_id: new UniqueEntityID(payment.order_id),
        total_amount: Number(payment.total_amount),
        status:payment.status as TPaymentStatus
      },
      new UniqueEntityID(payment.id)
    );
  }

  async create(payment:Payment): Promise<Payment> {
   
    await prisma.payment.create({
      data: {
        id: payment.id.toString(),
        order_id: payment.order_id.toString(),
        total_amount: payment.total_amount,
        code:String(payment.code),
        created_at: payment.created_at,
        status:payment.status as TPaymentStatus
      },
    });

    return payment;
  }

  async update(payment: Payment): Promise<Payment> {
    await prisma.payment.update({
      data: {
        
        status:payment.status,
        
      },
      where: {
        id: payment.id.toString(),
      },
    });

    return payment;
  }
  async findByCode(code: string): Promise<Payment | null> {
    const payment = await prisma.payment.findFirst({
      where: {
        code,
      },
    });
    if (!payment) {
      return null;
    }
    return new Payment(
      {
        code: payment.code,
        created_at: payment.created_at,
        order_id: new UniqueEntityID(payment.order_id),
        total_amount: Number(payment.total_amount),
        status:payment.status as TPaymentStatus
      },
      new UniqueEntityID(payment.id)
    );
  }
}