import { Router } from 'express';
import {usersController} from '../controllers/users-controller';





const userRoutes = Router();


userRoutes.post('/', usersController.create);

export {
  userRoutes
};
