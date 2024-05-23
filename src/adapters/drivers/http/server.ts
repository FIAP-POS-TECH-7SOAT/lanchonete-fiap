
import express,{  Request, Response, NextFunction } from 'express'
import 'express-async-errors';
import cors from 'cors'
import { routers } from './routes';
import { AppError } from '@shared/errors/AppError';
import { env } from '@shared/env';
import swaggerUi from 'swagger-ui-express';
import { resolve } from 'path';


import swaggerFile from './swagger-output.json';


const app = express();
app.use(cors());

app.use(express.json());
app.use("/files", express.static(resolve(__dirname, '..', '..', '..', 'shared', 'tmp', 'uploads')));

if(env.NODE_ENV !== 'production'){
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
}
app.use(routers);


app.use((err: Error, req: Request, res: Response, _: NextFunction) => {

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Server Internal Error',
  });
});



const port = env.PORT || 3333;
app.listen(port,()=>console.log(`server running on port ${port}`))
