import { CreateProdutoService } from '@application/produtos/application/use-case/create-produto-use-case';
import { Request, Response } from 'express';
import ProdutoRepository from 'src/adapters/drivens/infra/repositories/ProdutoRepository';
import { Categoria } from "@application/categorias/domain/categoria";

import { z } from 'zod';

const produtoRepository = new ProdutoRepository();

const createProdutoService = new CreateProdutoService(produtoRepository)
class ProdutosController {
  async create(req: Request, res: Response): Promise<Response> {
      /*
        #swagger.tags = ['Produtos']
        #swagger.summary = 'Create a new Produto'
        #swagger.parameters['Produto'] = {
            in: 'body',
            description: 'Produto info',
            required: true,
            schema: {
              nome: 'X-Bacon',
              categoria: 'Lanche',
              preco: 20.5, 
              descricao: 'PÃO, HAMGURGUER, MUSSARELA, BACON, ALFACE E TOMATE', 
            }
        }
      */
      const categoriasChaves = Object.keys(Categoria) as [keyof typeof Categoria]
      
      const checkInBodySchema = z.object({
          nome: z.string(),
          categoria: z.enum(categoriasChaves),
          preco:z.number(),
          descricao: z.string(),
      });
  
      const { nome,categoria,preco,descricao } = checkInBodySchema.parse(req.body)
          
      const produto = await createProdutoService.execute({    
        nome,
        categoria:categoria as Categoria,
        preco,
        descricao,
      });
       
     return res.json(produto);
  }
  //-------------------------------------------------------------------------
  async update(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  //-------------------------------------------------------------------------
}

export const produtosController = new ProdutosController()



