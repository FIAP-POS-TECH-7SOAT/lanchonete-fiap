Como inicializar o projeto lanchonete-fiap:

# Ambiente de desenvolvimento:
  
  ## Executando a instalação das dependências:
    npm install
  
  ## Gerando os arquivos de geração do banco de dados do Prisma:
    npm run prisma:generate
    
  ## Executando o projeto:
    npm run dev
    
# Ambiente de produção:

  ## Executando a instalação das dependências:
    npm install
    
  ## Gerando os arquivos de geração do banco de dados do Prisma:
    npm run prisma:generate
    
  ## Gerando os arquivos de build:
    npm build
    
  ## Executando o projeto:
    npm run start:prod
    
# Gerando imagem Docker:

  ## Fazendo o build da imagem:
    docker build -t lanchonete_fiap:latest .

  ## Rodando o container:
    docker run -p <PORT>:<PORT> -e PORT=<PORT> -e DATABASE_URL=<URL_DATABASE> -e APP_URL="http://localhost:<PORT>/" -e NODE_ENV=dev lanchonete_fiap

  ## Variáveis de ambiente:
    - PORT - A porta em que o servidor irá rodar.
    - URL_DATABASE - A URL do banco de dados **Postgres**.
    - APP_URL - URL do Bucket de imagem.
    - NODE_ENV - Possíveis valores para definir o Ambiente: 'dev', 'test', 'production'.

    
    
      
    

  

  


    
    
    
