import { CreateProductService } from "@application/products/application/use-case/create-product-use-case";
import { FindProductService } from "@application/products/application/use-case/find-product-use-case";
import { FindProductsByCategoryService } from "@application/products/application/use-case/find-product-by-category-use-case";

import { Request, Response } from "express";
import ProductRepository from "src/adapters/drivens/infra/repositories/product-repository";
import { Category } from "@application/categories/domain/category";

import { z } from "zod";
import { UpdateProductService } from "@application/products/application/use-case/update-product-use-case";
import { DeleteProductService } from "@application/products/application/use-case/delete-product-use-case";
import { UploadProductImageService } from "@application/products/application/use-case/upload-product-image-use-case";
import { ProductMapping } from "src/adapters/drivers/http/mapping/product-mapping";

import { AWSUploadFile } from "src/adapters/drivens/infra/providers/aws-upload-file";

const productRepository = new ProductRepository();

const findProductService = new FindProductService(productRepository);
const findProductsByCategoryService = new FindProductsByCategoryService(
  productRepository
);
const createProductService = new CreateProductService(productRepository);
const updateProductService = new UpdateProductService(productRepository);
const deleteProductService = new DeleteProductService(productRepository);
const awsUploadFile = new AWSUploadFile()
const uploadProductImageService = new UploadProductImageService(
  productRepository,
  awsUploadFile
  
);

interface IFile {
  filename: string;
}

class ProductController {
  async create(req: Request, res: Response): Promise<Response> {
    /*
        #swagger.tags = ['Product']
        #swagger.summary = 'Create a new Product'
        #swagger.parameters['Product'] = {
            in: 'body',
            description: 'Product info',
            required: true,
            schema: {
              name: 'X-Bacon',
              category: 'Lanche',
              price: 20.5, 
              description: 'PÃO, HAMGURGUER, MUSSARELA, BACON, ALFACE E TOMATE'
            }
        }
      */

    const categoryKeys = Object.keys(Category) as [keyof typeof Category];

    const checkInBodySchema = z.object({
      name: z.string(),
      category: z.enum(categoryKeys),
      price: z.number(),
      description: z.string(),
    });

    const { name, category, price, description } = checkInBodySchema.parse(
      req.body
    );

    const product = await createProductService.execute({
      name,
      category: category as Category,
      price,
      description,
    });

    return res.json(product);
  }
  //-------------------------------------------------------------------------
  async getById(req: Request, res: Response): Promise<Response> {
    /*
        #swagger.tags = ['Product']
        #swagger.summary = 'Find new Product by Id'
        #swagger.parameters['id'] = {
          description: 'Numeric ID of the Product to get'
        }
      */

    const { id } = req.params;

    const product = await findProductService.execute({
      id,
    });

    return res.json(ProductMapping.toView(product));
  }
  //-------------------------------------------------------------------------
  async getManyByCategory(req: Request, res: Response): Promise<Response> {
    /*
        #swagger.tags = ['Product']
        #swagger.summary = 'Find new Product by Category'
        #swagger.parameters['category'] = {
            in: 'query',
            description: 'Category of the Products to get',
            required: true,
            enum: ['Lanche', 'Acompanhamento', 'Bebida', 'Sobremesa']
        }
        */
    const { category } = req.query;

    const products = await findProductsByCategoryService.execute({
      category: category as Category,
    });

    return res.json(products.map(ProductMapping.toView));
  }
  //-------------------------------------------------------------------------
  async update(req: Request, res: Response): Promise<Response> {
    /*
        #swagger.tags = ['Product']
        #swagger.summary = 'Update a Product'
        #swagger.parameters['Product'] = {
            in: 'body',
            description: 'Product info',
            required: true,
            schema: {
              name: 'X-Bacon',
              category: 'Lanche',
              price: 22, 
              description: 'PÃO, HAMGURGUER, MUSSARELA, BACON, ALFACE E TOMATE'
            }
        }
      */
    const categoryKeys = Object.keys(Category) as [keyof typeof Category];

    const checkInBodySchema = z.object({
      
      name: z.string(),
      category: z.enum(categoryKeys),
      price: z.number(),
      description: z.string(),
      
    });
    const {id} = req.params
    const {  name, category, price, description } =
      checkInBodySchema.parse(req.body);

    const product = await updateProductService.execute({
      id: id,
      name: name,
      category: category as Category,
      price: price,
      description: description,

    });

    return res.json(product);
  }
  //-------------------------------------------------------------------------
  async delete(req: Request, res: Response): Promise<Response> {
    /*
        #swagger.tags = ['Product']
        #swagger.summary = 'mark the Product as deleted'
        #swagger.parameters['id'] = {
            description: 'Numeric ID of the Product to delete'
        }
      */
    const { id } = req.params;

    const product = await deleteProductService.execute({
      id,
    });

    return res.json(product);
  }
  //-------------------------------------------------------------------------
  async upload(req: Request, res: Response): Promise<Response> {
    /*
        #swagger.tags = ['Product']
        #swagger.summary = 'Upload products image'
        #swagger.consumes = ['multipart/form-data']  
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Product id'
        }
        #swagger.parameters['image'] = {
          in: 'formData',
          type: 'file',
          required: 'true',
          description: 'Products image',
        }
        */
    const checkInBodySchema = z.object({
      id: z.string(),
    });

    const checkInFileSchema = z.object({
      filename: z.string(),
      destination: z.string(),
    });

    const { id } = checkInBodySchema.parse(req.params);
    const { filename, destination} = checkInFileSchema.parse(req.file);

    const product = await findProductService.execute({
      id,
    });

    //prettier-ignore
    const response = await uploadProductImageService.execute({
      id: id,
      image: filename,
      filePath:destination
    });

    return res.json(product);
  }
}

export const productController = new ProductController();
