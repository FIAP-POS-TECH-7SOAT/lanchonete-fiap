# Projeto lanchonete-fiap

Este projeto visa construir uma API chamada lanchonete-fiap utilizando a linguagem Typescript. O projeto tem como objetivo construir um sistema de controle de pedidos. Com isso, melhorar a eficiência e qualidade no atendimento aos clientes de uma lanchonete que está em plena expansão.

# Como inicializar o projeto lanchonete-fiap:

## Ambiente de desenvolvimento:

### Executando a instalação das dependências:

    npm install

### Gerando os arquivos de geração do banco de dados do Prisma:

    npm run prisma:generate

### Executando o projeto:

    npm run dev

## Ambiente de produção:

### Executando a instalação das dependências:

    npm install

### Gerando os arquivos de geração do banco de dados do Prisma:

    npm run prisma:generate

### Gerando os arquivos de build:

    npm build

### Executando o projeto:

    npm run start:prod


## Gerando ou Atualizando o arquivo do Swagger:
    npm run doc

## URL do Swagger: http://localhost:3333/api-docs/
    
    
## Gerando imagem Docker:

### Fazendo o build da imagem:

    docker build -t lanchonete_fiap:latest .

### Rodando o container:

    docker run -p <PORT>:<PORT> -e PORT=<PORT> -e DATABASE_URL=<URL_DATABASE> -e APP_URL="http://localhost:<PORT>/" -e NODE_ENV=dev lanchonete_fiap

### Gerando docker-compose:
    docker-compose up --build

**Variáveis de ambiente:**

- PORT - A porta em que o servidor irá rodar.
- URL_DATABASE - A URL do banco de dados **Postgres**.
- APP_URL - URL do Bucket de imagem.
- NODE_ENV - Possíveis valores para definir o Ambiente: 'dev', 'test', 'production'.

## Árvore de diretórios:

```
.
├── docker-compose.yml
├── Dockerfile
├── example
│   ├── adapters
│   │   └── prismaPaymentRepository.ts
│   ├── core
│   │   ├── application
│   │   │   └── paymentService.ts
│   │   ├── paymentEntity.ts
│   │   ├── paymentRepository.ts
│   │   └── paymentService.ts
│   └── uploadImage.ts
├── package.json
├── package-lock.json
├── prisma
│   └── schema.prisma
├── README.md
├── src
│   ├── adapters
│   │   ├── drivens
│   │   │   └── infra
│   │   │       ├── providers
│   │   │       │   ├── fake-notification.ts
│   │   │       │   ├── fake-payment-gateway.ts
│   │   │       │   ├── fakes
│   │   │       │   │   └── fake-payment-gateway.ts
│   │   │       │   └── generation-unique-code.ts
│   │   │       └── repositories
│   │   │           ├── client-repository.ts
│   │   │           ├── mapping
│   │   │           │   ├── orders-mapping.ts
│   │   │           │   └── product-mapping.ts
│   │   │           ├── order-repository.ts
│   │   │           ├── payment-repository.ts
│   │   │           └── product-repository.ts
│   │   └── drivers
│   │       └── http
│   │           ├── controllers
│   │           │   ├── client-controller.ts
│   │           │   ├── order-controller.ts
│   │           │   ├── order-status-controller.ts
│   │           │   ├── payments-controller.ts
│   │           │   └── products-controller.ts
│   │           ├── mapping
│   │           │   ├── client-mapping.ts
│   │           │   ├── order-mapping.ts
│   │           │   └── product-mapping.ts
│   │           ├── routes
│   │           │   ├── client-routes.ts
│   │           │   ├── index.ts
│   │           │   ├── order-routes.ts
│   │           │   ├── order-status-routes.ts
│   │           │   ├── payment-routes.ts
│   │           │   └── product-routes.ts
│   │           ├── server.ts
│   │           ├── swagger.js
│   │           └── swagger-output.json
│   ├── core
│   │   ├── categories
│   │   │   └── domain
│   │   │       └── category.ts
│   │   ├── clients
│   │   │   ├── application
│   │   │   │   ├── ports
│   │   │   │   │   ├── providers
│   │   │   │   │   └── repositories
│   │   │   │   │       ├── client-repository.ts
│   │   │   │   │       └── dtos
│   │   │   │   │           └── client-dto.ts
│   │   │   │   └── use-case
│   │   │   │       ├── client-use-case.ts
│   │   │   │       └── Iclient-use-case.ts
│   │   │   └── domain
│   │   │       └── client-entity.ts
│   │   ├── orders
│   │   │   ├── application
│   │   │   │   ├── ports
│   │   │   │   │   ├── providers
│   │   │   │   │   │   ├── dtos
│   │   │   │   │   │   │   ├── notification-request-dto.ts
│   │   │   │   │   │   │   ├── process-payment-request-dto.ts
│   │   │   │   │   │   │   └── process-payment-response-dto.ts
│   │   │   │   │   │   ├── IGenerate-code-provider.ts
│   │   │   │   │   │   ├── INotification.ts
│   │   │   │   │   │   └── IPayment-gateway.ts
│   │   │   │   │   └── repositories
│   │   │   │   │       ├── dtos
│   │   │   │   │       │   ├── create-payment-dto.ts
│   │   │   │   │       │   └── order-dto.ts
│   │   │   │   │       ├── IPayment-repository.ts
│   │   │   │   │       └── order-repository.ts
│   │   │   │   └── use-case
│   │   │   │       ├── cancel-order-by-id-use-case.ts
│   │   │   │       ├── IOrder-use-case.ts
│   │   │   │       ├── order-use-case.ts
│   │   │   │       ├── process-payment-use-case.ts
│   │   │   │       └── update-order-status-by-id-use-case.ts
│   │   │   └── domain
│   │   │       ├── order-entity.ts
│   │   │       └── payment.ts
│   │   ├── products
│   │   │   ├── application
│   │   │   │   ├── ports
│   │   │   │   │   └── repositories
│   │   │   │   │       ├── dtos
│   │   │   │   │       │   ├── create-product-dto.ts
│   │   │   │   │       │   ├── update-product-dto.ts
│   │   │   │   │       │   └── upload-product-imagem-dto.ts
│   │   │   │   │       └── IProduct-repository.ts
│   │   │   │   └── use-case
│   │   │   │       ├── create-product-use-case.ts
│   │   │   │       ├── delete-product-use-case.ts
│   │   │   │       ├── find-product-by-category-use-case.ts
│   │   │   │       ├── find-product-use-case.ts
│   │   │   │       ├── update-product-use-case.ts
│   │   │   │       └── upload-product-image-use-case.ts
│   │   │   └── domain
│   │   │       └── product.ts
│   │   └── upload
│   └── shared
│       ├── configs
│       │   └── upload-file-config.ts
│       ├── entities
│       │   ├── entity.ts
│       │   └── optional.ts
│       ├── env
│       │   └── index.ts
│       ├── errors
│       │   └── AppError.ts
│       ├── lib
│       │   └── prisma.ts
│       └── tmp
│           └── uploads
└── tsconfig.json
```
