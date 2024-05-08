import { CreateProdutoService } from '@application/produtos/application/use-case/create-produto-use-case';
import { Request, Response } from 'express';
import ProdutoRepository from 'src/adapters/drivens/infra/repositories/ProdutoRepository';

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
              categoria: 1,
              preco: '20.5', 
              descricao: 'PÃO, HAMGURGUER, MUSSARELA, BACON, ALFACE E TOMATE', 
              imagem: 'URL'
            }
        }
      */
   
      const checkInBodySchema = z.object({
          nome: z.string(),
          categoria: z.enum([
            Categoria.Lanche,
            Categoria.Acompanhamento,
            Categoria.Bebida,
            Categoria.Sobremesa,
          ]),
          preco:z.number(),
          descricao: z.string(),
          imagem: z.string(),
      });

      console.log('req.body',req.body);
  
      const { nome,categoria,preco,descricao,imagem } = checkInBodySchema.parse(req.body)
          
      const produto = await createProdutoService.execute({    
        nome,
        categoria,
        preco,
        descricao,
        imagem
      });
       
     return res.json(produto);
  }
  //-------------------------------------------------------------------------

  //-------------------------------------------------------------------------
}

export const produtosController = new ProdutosController()



