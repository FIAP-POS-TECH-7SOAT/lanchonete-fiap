import { prisma } from '../prisma-client';

async function load() {
  const products = [
    {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      name: 'X-Burger',
      category: 'LANCHE',
      description: 'Um delicioso hambúrguer com queijo',
      deleted: false,
      price: 15.99,
      image:
        'https://blog.letskuk.com.br/wp-content/uploads/2022/10/lanches-gourmet.jpg',
    },
    {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d480',
      name: 'Batata Frita',
      category: 'ACOMPANHAMENTO',
      description: 'Batatas fritas crocantes',
      deleted: false,
      price: 8.99,
      image:
        'https://blog.letskuk.com.br/wp-content/uploads/2022/10/lanches-gourmet.jpg',
    },
    {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d481',
      name: 'Coca-Cola',
      category: 'BEBIDA',
      description: 'Refrigerante de cola',
      deleted: false,
      price: 5.0,
      image:
        'https://blog.letskuk.com.br/wp-content/uploads/2022/10/lanches-gourmet.jpg',
    },
    {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d482',
      name: 'Sorvete',
      category: 'SOBREMESA',
      description: 'Sorvete cremoso de baunilha',
      deleted: false,
      price: 7.5,
      image:
        'https://blog.letskuk.com.br/wp-content/uploads/2022/10/lanches-gourmet.jpg',
    },
    {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d483',
      name: 'Hambúrguer Vegano',
      category: 'LANCHE',
      description: 'Hambúrguer sem carne com vegetais',
      deleted: false,
      price: 17.99,
      image:
        'https://blog.letskuk.com.br/wp-content/uploads/2022/10/lanches-gourmet.jpg',
    },
    {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d484',
      name: 'Nuggets',
      category: 'ACOMPANHAMENTO',
      description: 'Pequenos pedaços de frango empanados',
      deleted: false,
      price: 10.5,
      image:
        'https://blog.letskuk.com.br/wp-content/uploads/2022/10/lanches-gourmet.jpg',
    },
    {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d485',
      name: 'Fanta Laranja',
      category: 'BEBIDA',
      description: 'Refrigerante sabor laranja',
      deleted: false,
      price: 5.0,
      image:
        'https://blog.letskuk.com.br/wp-content/uploads/2022/10/lanches-gourmet.jpg',
    },
    {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d486',
      name: 'Milkshake',
      category: 'SOBREMESA',
      description: 'Milkshake de chocolate',
      deleted: false,
      price: 12.0,
      image:
        'https://blog.letskuk.com.br/wp-content/uploads/2022/10/lanches-gourmet.jpg',
    },
    {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d487',
      name: 'Hot Dog',
      category: 'LANCHE',
      description: 'Cachorro-quente com salsicha e molho',
      deleted: false,
      price: 12.99,
      image:
        'https://blog.letskuk.com.br/wp-content/uploads/2022/10/lanches-gourmet.jpg',
    },
    {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d488',
      name: 'Anéis de Cebola',
      category: 'ACOMPANHAMENTO',
      description: 'Cebolas empanadas e fritas',
      deleted: false,
      price: 7.99,
      image:
        'https://blog.letskuk.com.br/wp-content/uploads/2022/10/lanches-gourmet.jpg',
    },
    {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d489',
      name: 'Suco de Laranja',
      category: 'BEBIDA',
      description: 'Suco natural de laranja',
      deleted: false,
      price: 6.5,
      image:
        'https://blog.letskuk.com.br/wp-content/uploads/2022/10/lanches-gourmet.jpg',
    },
    {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d490',
      name: 'Brownie',
      category: 'SOBREMESA',
      description: 'Brownie de chocolate com nozes',
      deleted: false,
      price: 8.5,
      image:
        'https://blog.letskuk.com.br/wp-content/uploads/2022/10/lanches-gourmet.jpg',
    },
    {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d491',
      name: 'X-Salada',
      category: 'LANCHE',
      description: 'Hambúrguer com salada e queijo',
      deleted: false,
      price: 14.99,
      image:
        'https://blog.letskuk.com.br/wp-content/uploads/2022/10/lanches-gourmet.jpg',
    },
    {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d492',
      name: 'Queijo Coalho',
      category: 'ACOMPANHAMENTO',
      description: 'Espeto de queijo coalho grelhado',
      deleted: false,
      price: 9.0,
      image:
        'https://blog.letskuk.com.br/wp-content/uploads/2022/10/lanches-gourmet.jpg',
    },
    {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d493',
      name: 'Guaraná',
      category: 'BEBIDA',
      description: 'Refrigerante de guaraná',
      deleted: false,
      price: 5.0,
      image:
        'https://blog.letskuk.com.br/wp-content/uploads/2022/10/lanches-gourmet.jpg',
    },
    {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d494',
      name: 'Pudim',
      category: 'SOBREMESA',
      description: 'Pudim de leite condensado',
      deleted: false,
      price: 6.99,
      image:
        'https://blog.letskuk.com.br/wp-content/uploads/2022/10/lanches-gourmet.jpg',
    },
    {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d495',
      name: 'X-Frango',
      category: 'LANCHE',
      description: 'Sanduíche de frango grelhado com queijo',
      deleted: false,
      price: 16.99,
      image:
        'https://blog.letskuk.com.br/wp-content/uploads/2022/10/lanches-gourmet.jpg',
    },
    {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d496',
      name: 'Mandioca Frita',
      category: 'ACOMPANHAMENTO',
      description: 'Mandiocas fritas crocantes',
      deleted: false,
      price: 7.99,
      image:
        'https://blog.letskuk.com.br/wp-content/uploads/2022/10/lanches-gourmet.jpg',
    },
    {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d497',
      name: 'Água',
      category: 'BEBIDA',
      description: 'Água mineral sem gás',
      deleted: false,
      price: 3.0,
      image:
        'https://blog.letskuk.com.br/wp-content/uploads/2022/10/lanches-gourmet.jpg',
    },
    {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d498',
      name: 'Mousse de Maracujá',
      category: 'SOBREMESA',
      description: 'Mousse de maracujá',
      deleted: false,
      price: 6.0,
      image:
        'https://blog.letskuk.com.br/wp-content/uploads/2022/10/lanches-gourmet.jpg',
    },
    {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d499',
      name: 'Cheeseburger',
      category: 'LANCHE',
      description: 'Hambúrguer com queijo cheddar',
      deleted: false,
      price: 15.49,
      image:
        'https://blog.letskuk.com.br/wp-content/uploads/2022/10/lanches-gourmet.jpg',
    },
    {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d500',
      name: 'Salada Caesar',
      category: 'ACOMPANHAMENTO',
      description: 'Salada caesar com frango grelhado',
      deleted: false,
      price: 11.99,
      image:
        'https://blog.letskuk.com.br/wp-content/uploads/2022/10/lanches-gourmet.jpg',
    },
    {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d501',
      name: 'Refrigerante Diet',
      category: 'BEBIDA',
      description: 'Refrigerante diet',
      deleted: false,
      price: 5.0,
      image:
        'https://blog.letskuk.com.br/wp-content/uploads/2022/10/lanches-gourmet.jpg',
    },
    {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d502',
      name: 'Torta de Limão',
      category: 'SOBREMESA',
      description: 'Torta de limão com merengue',
      deleted: false,
      price: 9.0,
      image:
        'https://blog.letskuk.com.br/wp-content/uploads/2022/10/lanches-gourmet.jpg',
    },
    {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d503',
      name: 'Wrap de Frango',
      category: 'LANCHE',
      description: 'Wrap de frango grelhado com vegetais',
      deleted: false,
      price: 18.99,
      image:
        'https://blog.letskuk.com.br/wp-content/uploads/2022/10/lanches-gourmet.jpg',
    },
    {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d504',
      name: 'Batata Doce Frita',
      category: 'ACOMPANHAMENTO',
      description: 'Batata doce frita e crocante',
      deleted: false,
      price: 9.5,
      image:
        'https://blog.letskuk.com.br/wp-content/uploads/2022/10/lanches-gourmet.jpg',
    },
    {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d505',
      name: 'Suco de Limão',
      category: 'BEBIDA',
      description: 'Suco natural de limão',
      deleted: false,
      price: 6.0,
      image:
        'https://blog.letskuk.com.br/wp-content/uploads/2022/10/lanches-gourmet.jpg',
    },
  ];

  const existingProducts = await prisma.product.findMany({
    select: { id: true },
  });

  const existingIds = new Set(existingProducts.map((product) => product.id));

  const newProducts = products.filter(
    (product) => !existingIds.has(product.id),
  );

  if (newProducts.length > 0) {
    await prisma.product.createMany({
      data: newProducts as any,
    });
    console.log('Produtos inseridos com sucesso!');
  } else {
    console.log('Nenhum novo produto para inserir.');
  }
}

load()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
