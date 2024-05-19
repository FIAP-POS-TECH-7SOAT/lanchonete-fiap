import { IProdutoRepository } from "@application/produtos/application/ports/repositories/IProdutoRepository";
import { CreateProdutoDTO } from "@application/produtos/application/ports/repositories/dtos/create-produto-dto";
import { UpdateProdutoDTO } from "@application/produtos/application/ports/repositories/dtos/update-produto-dto";
import { UploadProdutoImagemDTO } from "@application/produtos/application/ports/repositories/dtos/upload-produto-imagem-dto";

import { Produto } from "@application/produtos/domain/produto";
import { Categoria } from "@application/categorias/domain/categoria";
import { Categoria as CategoriaPrisma } from "@prisma/client";

import { prisma } from "@shared/lib/prisma";
import { ProdutoMapping } from "./mapping/produto-mapping";
import { produtosController } from "src/adapters/drivers/http/controllers/products-controller";

export default class ProdutoRepository implements IProdutoRepository {
  async findById(id: string): Promise<Produto | null> {
    const produto = await prisma.produto.findFirst({
      where: {
        id,
      },
    });

    if (!produto) {
      return null;
    }

    return ProdutoMapping.toDomain(produto);
  }

  async findManyByCategoria(categoria: Categoria): Promise<Produto[]> {
    const produtos = await prisma.produto.findMany({
      where: {
        categoria: categoria.toString().toUpperCase() as CategoriaPrisma,
      },
    });

    //Deserialize produtos to domain list of Produto's
    const domainProdutos = produtos.map((produto) =>
      ProdutoMapping.toDomain(produto)
    );
    return domainProdutos;
  }

  async create({
    nome,
    categoria,
    preco,
    descricao,
  }: CreateProdutoDTO): Promise<Produto> {
    const produto = new Produto({
      nome,
      categoria,
      preco,
      descricao,
      imagem: "", //remover e talvez criar um entity de imagem.
      deleted: false,
    });

    await prisma.produto.create({
      data: ProdutoMapping.toPrisma(produto),
    });

    return produto;
  }
  async update(produto: Produto): Promise<Produto> {
    await prisma.produto.update({
      data: ProdutoMapping.toPrisma(produto),
      where: {
        id: produto.id,
      },
    });

    return produto;
  }
  async delete(id: string): Promise<Produto | null> {
    const produto = await prisma.produto.delete({
      where: {
        id,
      },
    });

    if (!produto) {
      return null;
    }

    return ProdutoMapping.toDomain(produto);
  }

  async patchImagem({id, imagem}: UploadProdutoImagemDTO ): Promise<string> {
    await prisma.produto.update({
      where: {
        id: id
      },
      data: {
        imagem: imagem,
      },
    });

    return imagem;
  }

}
