# lanchonete-fiap
lanchonete-fiap é uma API em Typescript fazendo parte de um novo sistema de controle de pedidos com objetivo de melhorar a eficiência e qualidade no atendimento aos clientes de uma lanchonete de bairro que está em expansão.

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
    
## Gerando imagem Docker:

  ### Fazendo o build da imagem:
    docker build -t lanchonete_fiap:latest .

  ### Rodando o container:
    docker run -p <PORT>:<PORT> -e PORT=<PORT> -e DATABASE_URL=<URL_DATABASE> -e APP_URL="http://localhost:<PORT>/" -e NODE_ENV=dev lanchonete_fiap

**Variáveis de ambiente:**
  - PORT - A porta em que o servidor irá rodar.
  -  URL_DATABASE - A URL do banco de dados **Postgres**.
  - APP_URL - URL do Bucket de imagem.
  - NODE_ENV - Possíveis valores para definir o Ambiente: 'dev', 'test', 'production'.

  ## Árvore de diretórios:
  ```
  lanchonete-fiap
  ├── Dockerfile
  ├── package.json
  ├── prisma
  │   └── schema.prisma
  ├── src
  │   ├── adapters
  │   │   ├── drivens
  │   │   │   └── infra
  │   │   │   	├── providers
  │   │   │   	│   ├── BCryptHashProvider.ts
  │   │   │   	│   ├── FakeNotification.ts
  │   │   │   	│   ├── FakePaymentGateway.ts
  │   │   │   	│   ├── fakes
  │   │   │   	│   │   ├── FakeHashProvider.ts
  │   │   │   	│   │   ├── FakePaymentGateway.ts
  │   │   │   	│   │   └── generation-unique-code.ts
  │   │   │   	│   └── generation-unique-code.ts
  │   │   │   	└── repositories
  │   │   │       	├── clientRepository.ts
  │   │   │       	├── mapping
  │   │   │       	│   ├── orders-mapping.ts
  │   │   │       	│   └── produto-mapping.ts
  │   │   │       	├── orderRepository.ts
  │   │   │       	├── PaymentRepository.ts
  │   │   │       	├── ProdutoRepository.ts
  │   │   │       	└── UserRepository.ts
  │   │   └── drivers
  │   │   	└── http
  │   │       	├── controllers
  │   │       	│   ├── client-controller.ts
  │   │       	│   ├── order-controller.ts
  │   │       	│   ├── order-status-controller.ts
  │   │       	│   ├── payments-controller.ts
  │   │       	│   ├── products-controller.ts
  │   │       	│   └── users-controller.ts
  │   │       	├── mapping
  │   │       	│   └── produto-mapping.ts
  │   │       	├── routes
  │   │       	│   ├── clientRoutes.ts
  │   │       	│   ├── index.ts
  │   │       	│   ├── orderRoutes.ts
  │   │       	│   ├── order-status-routes.ts
  │   │       	│   ├── payment.routes.ts
  │   │       	│   ├── produto.routes.ts
  │   │       	│   └── users.routes.ts
  │   │       	├── server.ts
  │   │       	├── swagger.js
  │   │       	└── swagger-output.json
  │   ├── core
  │   │   ├── categorias
  │   │   │   └── domain
  │   │   │   	└── categoria.ts
  │   │   ├── clients
  │   │   │   ├── application
  │   │   │   │   ├── ports
  │   │   │   │   │   └── repositories
  │   │   │   │   │   	├── ClientRepository.ts
  │   │   │   │   │   	└── dtos
  │   │   │   │   │       	└── clientDTO.ts
  │   │   │   │   └── service
  │   │   │   │   	├── clientService.ts
  │   │   │   │   	└── IclientService.ts
  │   │   │   └── domain
  │   │   │   	└── clientEntity.ts
  │   │   ├── orders
  │   │   │   ├── application
  │   │   │   │   ├── ports
  │   │   │   │   │   ├── providers
  │   │   │   │   │   │   ├── dtos
  │   │   │   │   │   │   │   ├── NotificationRequest.ts
  │   │   │   │   │   │   │   ├── ProcessPaymentRequest.ts
  │   │   │   │   │   │   │   └── ProcessPaymentResponse.ts
  │   │   │   │   │   │   ├── INotification.ts
  │   │   │   │   │   │   └── IPaymentGateway.ts
  │   │   │   │   │   └── repositories
  │   │   │   │   │   	├── dtos
  │   │   │   │   │   	│   ├── create-payment-dto.ts
  │   │   │   │   │   	│   └── orderDTO.ts
  │   │   │   │   │   	├── IPaymentRepository.ts
  │   │   │   │   │   	└── orderRepository.ts
  │   │   │   │   └── use-case
  │   │   │   │   	├── cancel-order-by-id.ts
  │   │   │   │   	├── IorderService.ts
  │   │   │   │   	├── orderService.ts
  │   │   │   │   	├── process-payment.ts
  │   │   │   │   	└── update-order-status-by-id.ts
  │   │   │   └── domain
  │   │   │   	├── orderEntity.ts
  │   │   │   	└── payment.ts
  │   │   ├── produtos
  │   │   │   ├── application
  │   │   │   │   ├── ports
  │   │   │   │   │   ├── providers
  │   │   │   │   │   └── repositories
  │   │   │   │   │   	├── dtos
  │   │   │   │   │   	│   ├── create-produto-dto.ts
  │   │   │   │   │   	│   ├── update-produto-dto.ts
  │   │   │   │   │   	│   └── upload-produto-imagem-dto.ts
  │   │   │   │   │   	└── IProdutoRepository.ts
  │   │   │   │   └── use-case
  │   │   │   │   	├── create-produto-use-case.ts
  │   │   │   │   	├── delete-produto-use-case.ts
  │   │   │   │   	├── find-produtos-by-categoria-use-case.ts
  │   │   │   │   	├── find-produto-use-case.ts
  │   │   │   │   	├── update-produto-use-case.ts
  │   │   │   │   	└── upload-produto-imagem-use-case.ts
  │   │   │   └── domain
  │   │   │   	└── produto.ts
  │   │   └── user-exemple
  │   │   	├── application
  │   │   	│   ├── ports
  │   │   	│   │   ├── providers
  │   │   	│   │   │   ├── IGenerateCodeProvider.ts
  │   │   	│   │   │   └── IHashProvider.ts
  │   │   	│   │   └── repositories
  │   │   	│   │   	├── dtos
  │   │   	│   │   	│   └── create-user-dto.ts
  │   │   	│   │   	└── IUserRepository.ts
  │   │   	│   └── use-case
  │   │   	│   	├── create-user-use-case.ts
  │   │   	│   	└── show-profile-use-case.ts
  │   │   	└── domain
  │   │       	└── user.ts
  │   └── shared
  │   	├── entities
  │   	│   ├── entity.ts
  │   	│   └── optional.ts
  │   	├── env
  │   	│   └── index.ts
  │   	├── errors
  │   	│   └── AppError.ts
  │   	├── lib
  │   	│   └── prisma.ts
  │   	└── tmp
  │       	└── uploads
  └── tsconfig.json
  ```

    
    
      
    

  

  


    
    
    
