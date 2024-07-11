import { IProductRepository } from "@application/products/application/ports/repositories/IProduct-repository";
import { CreateProductDTO } from "@application/products/application/ports/repositories/dtos/create-product-dto";
import { UploadProductImageDTO } from "@application/products/application/ports/repositories/dtos/upload-product-imagem-dto";


import { Category } from "@application/categories/domain/category";


import { Product } from "@application/products/domain/product";
import { AppError } from "@shared/errors/AppError";


export default class FakeProductRepository implements IProductRepository {

  private repository:Product[] = [];
  async findByIds(ids: string[]): Promise<Product[]> {
    const products = this.repository.filter(product=>ids.includes(product.id));
    return products;
  }

  async findById(id: string): Promise<Product | null> {
    const product = this.repository.find(product=> id ===product.id);
    if(!product){
      throw new AppError('Product not found')
    }
    return product;
  }

  async findManyByCategory(category: Category): Promise<Product[]> {
    const products = this.repository.filter(product=> category.toString().toUpperCase() ===product.category);
  
    return products;
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

    this.repository.push(product)

    return product;
  }
  async update(product: Product): Promise<Product> {
    const productIndex = this.repository.findIndex(item=> item.id ===product.id);
    this.repository[productIndex] = product

    return product;
  }
  async delete(id: string): Promise<Product | null> {
    const productIndex = this.repository.findIndex(item=> item.id ===id);
    const product = this.repository[productIndex];
    this.repository.splice(productIndex,1);


    return product;
  }

  async patchImage({ id, image }: UploadProductImageDTO): Promise<string> {
    const productIndex = this.repository.findIndex(item=> item.id ===id);
    this.repository[productIndex].image = image

    return image;
  }
}
