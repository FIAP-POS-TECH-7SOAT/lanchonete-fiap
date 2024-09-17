
import express,{  Request, Response, NextFunction } from 'express'
import 'express-async-errors';
import cors from 'cors'
import { routers } from './routes';
import { AppError } from '@shared/errors/AppError';
import { env } from '@adapters/drivens/infra/env';
import swaggerUi from 'swagger-ui-express';
import { resolve } from 'path';


import swaggerFile from './swagger-output.json';
import { ZodError } from 'zod';


const app = express();
app.use(cors());

app.use(express.json());

if(env.NODE_ENV !== 'production'){
  app.use("/files", express.static(resolve(__dirname, '..', '..', '..', 'shared', 'tmp', 'uploads')));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
}
app.use(routers);


app.use((err: Error, req: Request, res: Response, _: NextFunction) => {

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
    });
  }
  if(err instanceof ZodError){
    const errors = err.format() as any;
    delete errors._errors
    const messages = Object.keys(errors).map(key=>({
      [key]:errors[key]._errors
    }))
    return res.status(400).json({
      status: 400,
      messages
    });
  }
  console.error(err);

  return res.status(500).json({
    status: 500,
    message: 'Server Internal Error',
  });
});



const port = env.PORT || 3333;
app.listen(port,()=>console.log(`server running on port ${port}`))
