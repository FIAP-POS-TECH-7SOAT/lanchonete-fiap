import { UploadProductImageDTO } from '@application/domain/products/application/ports/repositories/dtos/upload-product-imagem-dto';

import { Product } from '@application/domain/products/entities/product';
import { Category } from '@application/domain/categories/entities/category';
import { Category as CategoryPrisma } from '@prisma/client';

import { prisma } from '../prisma-client';
import { ProductMapping } from './mapping/product-mapping';
import { ProductRepository } from '@application/domain/products/application/ports/repositories/IProduct-repository';

export class PrismaProductRepository implements ProductRepository {
  async findByIds(ids: string[]): Promise<Product[]> {
    const product = await prisma.product.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return product.map(ProductMapping.toDomain);
  }
  async findById(id: string): Promise<Product | null> {
    const product = await prisma.product.findFirst({
      where: {
        id,
      },
    });

    if (!product) {
      return null;
    }

    return ProductMapping.toDomain(product);
  }

  async findManyByCategory(category: Category): Promise<Product[]> {
    const products = await prisma.product.findMany({
      where: {
        category: category?.toString().toUpperCase() as CategoryPrisma,
      },
    });

    //Deserialize produtos to domain list of Produto's
    const domainProducts = products.map((product: any) =>
      ProductMapping.toDomain(product),
    );
    return domainProducts;
  }

  async create(product: Product): Promise<Product> {
    await prisma.product.create({
      data: ProductMapping.toPrisma(product),
    });

    return product;
  }
  async update(product: Product): Promise<Product> {
    await prisma.product.update({
      data: ProductMapping.toPrisma(product),
      where: {
        id: product.id.toString(),
      },
    });

    return product;
  }
  async delete(id: string): Promise<Product | null> {
    const product = await prisma.product.delete({
      where: {
        id,
      },
    });

    if (!product) {
      return null;
    }

    return ProductMapping.toDomain(product);
  }

  async patchImage({ id, image }: UploadProductImageDTO): Promise<string> {
    await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        image: image,
      },
    });

    return image;
  }
}
