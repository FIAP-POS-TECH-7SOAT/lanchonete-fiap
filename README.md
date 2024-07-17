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

    docker run -p <PORT>:<PORT> -e PORT=<PORT> -e DATABASE_URL=<DATABASE_URL> -e APP_URL="http://localhost:<PORT>/" -e NODE_ENV=dev lanchonete_fiap

### Gerando docker-compose:

    docker-compose up --build

**Variáveis de ambiente:**

- PORT - A porta em que o servidor irá rodar.
- DATABASE_URL - A URL do banco de dados **Postgres**.
- APP_URL - URL do Bucket de imagem.
- NODE_ENV - Possíveis valores para definir o Ambiente: 'dev', 'test', 'production'.

## Deploy do projeto utilizando os serviços da Amazon AWS:

- Garanta ter uma conta na AWS
- Faça o download do AWS CLI e o instale
- Instale o kubectl
- Com o linux, instale também o minikube
- Crie um cluster no EC2 dentro do console da AWS
- Utilize o comando abaixo
  aws configure

- Com o comando acima, abrirá um arquivo json. Nele preecha corretamente com as informações da sua conta AWS
- Agora utilizando o seu aws cli digite os comandos abaixo
  aws eks update-kubeconfig --name (nome do cluster)
  kubectl apply -f config-map.yaml
  kubectl apply -f deployment.yaml
  kubectl -f service.yaml

- Utilize o comando abaixo para verificar se os pods e serviços estarão prontos
  kubectl get pods --watch

- Utilize o comando abaixo para conseguir o ip externo para o uso da aplicação
  kutctl get svc app-service (ou) kubectl get services

## Arquitetura do Projeto:

![alt text](https://github.com/FIAP-POS-TECH-7SOAT/blob/readme_arquitetura/arquitetura_fiap.jpg?raw=true)

## Árvore de diretórios:

```
.
├── docker-compose.yml
├── Dockerfile
├── package.json
├── package-lock.json
├── prisma
│   └── schema.prisma
├── README.md
├── src
├── adapters
│   ├── drivens
│   │   └── infra
│   │       ├── providers
│   │       │   ├── aws-upload-file.ts
│   │       │   ├── fake-notification.ts
│   │       │   ├── fake-payment-gateway.ts
│   │       │   ├── fakes
│   │       │   │   └── fake-payment-gateway.ts
│   │       │   ├── gcp-upload-file.ts
│   │       │   ├── generation-unique-code.ts
│   │       │   └── mercado-pago-pix-payment-gateway.ts
│   │       └── repositories
│   │           ├── client-repository.ts
│   │           ├── mapping
│   │           │   ├── orders-mapping.ts
│   │           │   └── product-mapping.ts
│   │           ├── order-repository.ts
│   │           ├── payment-repository.ts
│   │           └── product-repository.ts
│   └── drivers
│       └── http
│           ├── controllers
│           │   ├── client-controller.ts
│           │   ├── order-controller.ts
│           │   ├── order-status-controller.ts
│           │   ├── payments-controller.ts
│           │   └── products-controller.ts
│           ├── mapping
│           │   ├── client-mapping.ts
│           │   ├── order-mapping.ts
│           │   ├── payment-mapping.ts
│           │   └── product-mapping.ts
│           ├── routes
│           │   ├── client-routes.ts
│           │   ├── index.ts
│           │   ├── order-routes.ts
│           │   ├── order-status-routes.ts
│           │   ├── payment-routes.ts
│           │   └── product-routes.ts
│           ├── server.ts
│           ├── swagger.js
│           └── swagger-output.json
│           ├── core
│           │   ├── categories
│           │   │   └── domain
│           │   │       └── category.ts
│           │   ├── clients
│           │   │   ├── application
│           │   │   │   ├── ports
│           │   │   │   │   └── repositories
│           │   │   │   │       ├── client-repository.ts
│           │   │   │   │       └── dtos
│           │   │   │   │           └── client-dto.ts
│           │   │   │   └── use-case
│           │   │   │       ├── client-use-case.ts
│           │   │   │       ├── create-cliente-use-case.ts
│           │   │   │       └── Iclient-use-case.ts
│           │   │   └── domain
│           │   │       └── client-entity.ts
│           │   ├── orders
│           │   │   ├── application
│           │   │   │   ├── ports
│           │   │   │   │   ├── providers
│           │   │   │   │   │   ├── dtos
│           │   │   │   │   │   │   ├── notification-request-dto.ts
│           │   │   │   │   │   │   ├── process-payment-request-dto.ts
│           │   │   │   │   │   │   └── process-payment-response-dto.ts
│           │   │   │   │   │   ├── IGenerate-code-provider.ts
│           │   │   │   │   │   ├── INotification.ts
│           │   │   │   │   │   └── IPayment-gateway.ts
│           │   │   │   │   └── repositories
│           │   │   │   │       ├── dtos
│           │   │   │   │       │   ├── create-payment-dto.ts
│           │   │   │   │       │   └── order-dto.ts
│           │   │   │   │       ├── IPayment-repository.ts
│           │   │   │   │       └── order-repository.ts
│           │   │   │   └── use-case
│           │   │   │       ├── cancel-order-by-id-use-case.ts
│           │   │   │       ├── create-order-use-case.ts
│           │   │   │       ├── find-order-by-id-use-case.ts
│           │   │   │       ├── find-payment-by-id-use-case.ts
│           │   │   │       ├── list-all-order-by-filters-use-case.ts
│           │   │   │       ├── process-payment-use-case.ts
│           │   │   │       ├── update-order-by-id-use-case.ts
│           │   │   │       └── update-order-status-by-id-use-case.ts
│           │   │   └── domain
│           │   │       ├── order-entity.ts
│           │   │       └── payment.ts
│           │   └── products
│           │       ├── application
│           │       │   ├── ports
│           │       │   │   ├── providers
│           │       │   │   │   └── upload-file-interface.ts
│           │       │   │   └── repositories
│           │       │   │       ├── dtos
│           │       │   │       │   ├── create-product-dto.ts
│           │       │   │       │   ├── update-product-dto.ts
│           │       │   │       │   └── upload-product-imagem-dto.ts
│           │       │   │       ├── fakes
│           │       │   │       │   └── fake-product-repository.ts
│           │       │   │       └── IProduct-repository.ts
│           │       │   └── use-case
│           │       │       ├── create-product-use-case.spec.ts
│           │       │       ├── create-product-use-case.ts
│           │       │       ├── delete-product-use-case.ts
│           │       │       ├── find-product-by-category-use-case.ts
│           │       │       ├── find-product-use-case.ts
│           │       │       ├── update-product-use-case.ts
│           │       │       └── upload-product-image-use-case.ts
│           │       └── domain
│           │           └── product.ts
│           └── shared
│               ├── configs
│               │   └── upload-file-config.ts
│               ├── entities
│               │   ├── entity.ts
│               │   └── optional.ts
│               ├── env
│               │   └── index.ts
│               ├── errors
│               │   └── AppError.ts
│               └── lib
│                   └── prisma.ts
├── tsconfig.json
└── k8s
│    ├── db-deployment.yml
│    ├── db-pvc.yml
│    ├── db-pv.yml
│    ├── db-service.yml
│    ├── lanchonete-deployment.yml
│    ├── lanchonete-hpa.yml
│    ├── lanchonete-service.yml
│    └── metrics-component.yml
```
