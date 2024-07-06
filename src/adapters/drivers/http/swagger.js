const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
    info: {
        version: "1.0.0",
        title: "My API",
        description: "Some description..."
    },
    "components": {
        "parameters": {
          "ContentTypeHeader": {
            "name": "Content-Type",
            "in": "header",
            "required": true,
            "schema": {
              "type": "string",
              "example": "application/json"
            }
          }
        }
      },
    consumes: ['application/json'],             // by default: ['application/json']
    produces: ['application/json'],             // by default: ['application/json']
    servers: [
        {
            url: 'http://localhost:3333'
        }
    ],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc)