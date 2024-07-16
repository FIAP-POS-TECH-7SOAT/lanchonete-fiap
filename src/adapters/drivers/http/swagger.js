const swaggerAutogen = require('swagger-autogen')({ swagger: '2.0' });
const appInfo = require('../../../../package.json')
const doc = {
    info: {
        version: appInfo.version,
        title: "Lanchonete API",
        description: "A API de Lanchonete é uma solução robusta para gerenciar operações de lanchonetes e restaurantes. Com funcionalidades para cadastrar produtos, pedidos e clientes, a API facilita a gestão de cardápios, o acompanhamento de pedidos e a manutenção de informações dos clientes. Além disso, oferece endpoints seguros e eficientes para integrar com sistemas externos e aplicativos móveis, garantindo uma experiência de usuário otimizada e um fluxo de trabalho mais ágil."
    },

    host:"localhost:3333",

  
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc)