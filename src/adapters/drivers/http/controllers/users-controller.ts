import { CreateUserService } from '@application/user-exemple/application/use-case/create-user-use-case';
import { Request, Response } from 'express';
import { BCryptHashProvider } from 'src/adapters/drivens/infra/providers/BCryptHashProvider';
import UserRepository from 'src/adapters/drivens/infra/repositories/UserRepository';
import { z } from 'zod';



const userRepository = new UserRepository();
const bcryptHashProvider = new BCryptHashProvider();


const createUserService = new CreateUserService(userRepository,bcryptHashProvider)
class UsersController {
  async create(req: Request, res: Response): Promise<Response> {
    /*
       #swagger.tags = ['Users']
       #swagger.summary = 'Create a new user'
       #swagger.parameters['User'] = {
           in: 'body',
           description: 'User info',
           required: true,
           schema: {
             name: 'john doe',
             email: 'mail@mail.com',
             password: 'teste123'
           }
       }
     */
   
     const checkInBodySchema = z.object({
       name: z.string(),
       email: z.string(),
       password: z.string(),
     });
  
  
     const { name, email, password  } = checkInBodySchema.parse(req.body)
       
     const user = await createUserService.execute({ name, email, password });
       
     return res.json(user);
  }
}

export const usersController = new UsersController()



