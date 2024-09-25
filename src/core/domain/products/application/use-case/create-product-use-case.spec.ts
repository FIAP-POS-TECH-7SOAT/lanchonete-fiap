import { Category } from '@application/domain/categories/entities/category';
import FakeProductRepository from '../ports/repositories/fakes/fake-product-repository';
import { CreateProductService } from './create-product-use-case';
import { describe, beforeEach, it, expect } from 'vitest';

describe('[Products] -> Create a product', () => {
  let fakeProductRepository: FakeProductRepository;
  let createProductService: CreateProductService;

  beforeEach(() => {
    fakeProductRepository = new FakeProductRepository();
    createProductService = new CreateProductService(fakeProductRepository);
  });
  it('should be possible create a new product', async () => {
    const sut = await createProductService.execute({
      category: 'LANCHE' as Category,
      description: 'description-test',
      name: 'name-test',
      price: 200,
    });

    expect(sut.id).toBeTruthy();
  });
});
