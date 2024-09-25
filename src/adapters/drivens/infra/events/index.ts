import { OnPaymentCreated } from '@application/domain/orders/application/subscribers/on-payment-created';
import { AddCodeToOrderByIdUseCase } from '@application/domain/orders/application/use-case/add-code-to-order-by-id-use-case';
import { PrismaOrderRepository } from '../database/prisma/repositories/order-repository';
import { PrismaOrderProductRepository } from '../database/prisma/repositories/order-product-repository';
import { GenerateCodeProvider } from '../providers/generation-unique-code';

const prismaOrderProductRepository = new PrismaOrderProductRepository();
const prismaOrderRepository = new PrismaOrderRepository(
  prismaOrderProductRepository,
);
const generateCodeProvider = new GenerateCodeProvider();
const addCodeToOrderByIdUseCase = new AddCodeToOrderByIdUseCase(
  prismaOrderRepository,
  generateCodeProvider,
);

new OnPaymentCreated(addCodeToOrderByIdUseCase);
