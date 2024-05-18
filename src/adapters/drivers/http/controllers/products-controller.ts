import { CreateProdutoService } from '@application/produtos/application/use-case/create-produto-use-case';
import { FindProdutoService } from '@application/produtos/application/use-case/find-produto-use-case';
import { FindProdutosByCategoriaService } from '@application/produtos/application/use-case/find-produtos-by-categoria-use-case';

import { Request, Response } from 'express';
import ProdutoRepository from 'src/adapters/drivens/infra/repositories/ProdutoRepository';
import { Categoria } from "@application/categorias/domain/categoria";

import { z } from 'zod';
import { UpdateProdutoService } from '@application/produtos/application/use-case/update-produto-use-case';
import { DeleteProdutoService } from '@application/produtos/application/use-case/delete-produto-use-case';

const produtoRepository = new ProdutoRepository();

const findProdutoService = new FindProdutoService(produtoRepository);
const findProdutosByCategoriaService = new FindProdutosByCategoriaService(produtoRepository);
const createProdutoService = new CreateProdutoService(produtoRepository);
const updateProdutoService = new UpdateProdutoService(produtoRepository);
const deleteProdutoService = new DeleteProdutoService(produtoRepository);
class ProdutosController {
  async create(req: Request, res: Response): Promise<Response> {
      /*
        #swagger.tags = ['Produto']
        #swagger.summary = 'Create a new Produto'
        #swagger.parameters['Produto'] = {
            in: 'body',
            description: 'Produto info',
            required: true,
            schema: {
              nome: 'X-Bacon',
              categoria: 'Lanche',
              preco: 20.5, 
              descricao: 'PÃO, HAMGURGUER, MUSSARELA, BACON, ALFACE E TOMATE'
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
  async getById(req: Request, res: Response): Promise<Response>{
      /*
        #swagger.tags = ['Produto']
        #swagger.summary = 'Find new Produto by Id'
        #swagger.parameters['id'] = {
          description: 'Numeric ID of the Produto to get'
        }
      */

      const {id} = req.params;

      const produto = await findProdutoService.execute({
        id
      });

      return res.json(produto);
  }
  //-------------------------------------------------------------------------
  async getManyByCategoria(req: Request, res: Response): Promise<Response>{
        /*
        #swagger.tags = ['Produto']
        #swagger.summary = 'Find new Produto by Categoria'
        #swagger.parameters['categoria'] = {
            in: 'query',
            description: 'Categoria of the Produtos to get',
            required: true,
            enum: ['Lanche', 'Acompanhamento', 'Bebida', 'Sobremesa']
        }
        */
      const {categoria} = req.query;

      const produtos = await findProdutosByCategoriaService.execute({
        categoria:categoria as Categoria
      });

      return res.json(produtos);
  }
  //-------------------------------------------------------------------------
  async update(req: Request, res: Response): Promise<Response> {
      /*
        #swagger.tags = ['Produto']
        #swagger.summary = 'Update a Produto'
        #swagger.parameters['Produto'] = {
            in: 'body',
            description: 'Produto info',
            required: true,
            schema: {
              nome: 'X-Bacon',
              categoria: 'Lanche',
              preco: 22, 
              descricao: 'PÃO, HAMGURGUER, MUSSARELA, BACON, ALFACE E TOMATE'
            }
        }
      */
    const categoriasChaves = Object.keys(Categoria) as [keyof typeof Categoria]

    const checkInBodySchema = z.object({
      id: z.string(),
      nome: z.string(),
      categoria: z.enum(categoriasChaves),
      preco:z.number(),
      descricao: z.string(),
      imagem: z.string(),
    });

    const { id, nome, categoria, preco, descricao, imagem } = checkInBodySchema.parse(req.body)

    const produto = await updateProdutoService.execute({
      id: id,
      nome: nome,
      categoria:categoria as Categoria,
      preco: preco,
      descricao: descricao,
      imagem: imagem,
    });

    return res.json(produto);
  }
  //-------------------------------------------------------------------------
  async delete(req: Request, res: Response): Promise<Response> {
      /*
        #swagger.tags = ['Produto']
        #swagger.summary = 'mark the Produto as deleted'
        #swagger.parameters['id'] = {
            description: 'Numeric ID of the Produto to delete'
        }
      */
      const {id} = req.params;

      const produto = await deleteProdutoService.execute({
        id
      });

      return res.json(produto);
  }
  //-------------------------------------------------------------------------
}

export const produtosController = new ProdutosController()



