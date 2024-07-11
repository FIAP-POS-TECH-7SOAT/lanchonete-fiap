import { IProductRepository } from "@application/products/application/ports/repositories/IProduct-repository";
import { CreateProductDTO } from "@application/products/application/ports/repositories/dtos/create-product-dto";
import { UploadProductImageDTO } from "@application/products/application/ports/repositories/dtos/upload-product-imagem-dto";

import { Product } from "@application/products/domain/product";
import { Category } from "@application/categories/domain/category";
import { Category as CategoryPrisma } from "@prisma/client";

import { prisma } from "@shared/lib/prisma";
import { ProductMapping } from "./mapping/product-mapping";

export default class ProductRepository implements IProductRepository {
  async findByIds(ids: string[]): Promise<Product[]> {
    const product = await prisma.product.findMany({
      where: {
        id:{
          in:ids
        }
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
      ProductMapping.toDomain(product)
    );
    return domainProducts;
  }

  async create({
    name,
    category,
    price,
    description,
  }: CreateProductDTO): Promise<Product> {
    const product = new Product({
      name,
      category,
      price,
      description,
      image: "", //remover e talvez criar um entity de imagem.
      deleted: false,
    });

    await prisma.product.create({
      data: ProductMapping.toPrisma(product),
    });

    return product;
  }
  async update(product: Product): Promise<Product> {
    await prisma.product.update({
      data: ProductMapping.toPrisma(product),
      where: {
        id: product.id,
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
