import swaggerJSDoc from 'swagger-jsdoc';
import authRouter from '../authentication/route/authRoute';

const PORT = Number(process.env.PORT) ?? 3000;
const HOST = process.env.HOST!;

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'API Documentación',
      version: '1.0.0',
      description: 'Documentación de la API del backend  de Quick Tickets con Express y Swagger',
    },
    components: {
      securitySchemes: {
          bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT'
          }
      }
  },
    servers: [
      {
        url: `http://${HOST}:${PORT}`,
        description: 'Local Quick Tickets Swagger Server',
      },
    ],
  };
  
  const options = {
    swaggerDefinition,
    apis: ['./authentication/route/*.ts', './users/route/*.ts', './categories/route/*.ts', './events/route/*.ts', './ticket/route/*.ts', './payment/route/*.ts', './orders/route/*.ts', './cloudinary/route/*.ts'],
  };
  
  export default swaggerJSDoc(options);