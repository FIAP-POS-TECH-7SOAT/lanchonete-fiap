import { IProdutoRepository } from "@application/produtos/application/ports/repositories/IProdutoRepository";
import { CreateProdutoDTO } from "@application/produtos/application/ports/repositories/dtos/create-produto-dto";
import { UpdateProdutoDTO } from "@application/produtos/application/ports/repositories/dtos/update-produto-dto";
import { Produto } from "@application/produtos/domain/produto";
import { Categoria } from "@application/categorias/domain/categoria";

import { prisma } from '@shared/lib/prisma'
import { ProdutoMapping } from "./mapping/produto-mapping";


export default class ProdutoRepository implements IProdutoRepository {
  async findById(id: string): Promise<Produto | null> {
    const produto = await prisma.produto.findFirst({
      where: {
        id
      }
    });

    if (!produto){
      return null;
    }

    return ProdutoMapping.toDomain(produto);
  }

  findByCategoria(categoria: Categoria): Promise<Produto |null>{
    throw new Error("Method not implemented.");
  }
  async create({nome, categoria, preco, descricao}: CreateProdutoDTO): Promise<Produto> {
    const produto = new Produto({
        nome,
        categoria,
        preco,
        descricao,
        imagem //remover e talvez criar um entity de imagem.
      })
      await prisma.produto.create({
        data:{
          id:produto.id,
          nome:produto.nome,
          Categoria:produto.categoria,
          preco: produto.preco,
          descricao: produto.descricao,
        }
      })
  
      return produto
  }
  async update(produto: Produto): Promise<Produto>{
    await prisma.produto.update({
      data: ProdutoMapping.toPrisma(produto),
      where: {
        id: produto.id,
      }
    })

    return produto
  }

}
