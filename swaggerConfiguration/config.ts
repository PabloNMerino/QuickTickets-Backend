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
    servers: [
      {
        url: `http://${HOST}:${PORT}`,
        description: 'Local Quick Tickets Swagger Server',
      },
    ],
  };
  
  const options = {
    swaggerDefinition,
    apis: ['./authentication/route/*.ts'], // Ruta a tus archivos de rutas donde agregarás las anotaciones de Swagger
  };
  
  export default swaggerJSDoc(options);