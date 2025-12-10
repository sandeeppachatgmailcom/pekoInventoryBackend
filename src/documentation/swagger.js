const swaggerJSDoc = require("swagger-jsdoc");

const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',  
      info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'API for managing Accounts  operations',
      },
      servers: [
         {
          url: 'https://pekoinventorybackend.onrender.com/',
          description: 'online  sever for frontend developers',
        },
        {
          url: 'http://localhost:8092',
          description: 'local  sever for backend developers',
        },
        
         
      ],
       components: {
          securitySchemes: {
              bearerAuth: {
                  type: 'http',
                  scheme: 'bearer',
                  bearerFormat: 'JWT', // Optional: indicates token format
              },
          },
      },
      security: [
          {
              bearerAuth: [], // Applies Bearer authentication globally
          },
      ],
    },
    
    apis: ['./src/documentation/**/*.js'],  
  };
   
const swaggerDocs = swaggerJSDoc(swaggerOptions);

module.exports = swaggerDocs;
