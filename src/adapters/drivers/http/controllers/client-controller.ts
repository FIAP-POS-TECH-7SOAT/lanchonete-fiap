import {
  CreateClientService,
  GetClientService,
} from "@application/user-exemple/application/use-case/create-client-use-case";
import { Request, Response } from "express";
import ClientRepository from "src/adapters/drivens/infra/repositories/ClientRepository";
import { z } from "zod";

const clientRepository = new ClientRepository();

const createClientService = new CreateClientService(clientRepository);

const getClientService = new GetClientService(clientRepository);

class ClientController {
  async create(req: Request, res: Response): Promise<Response> {
    /*
       #swagger.tags = ['Client']
       #swagger.summary = 'Create a new client'
       #swagger.parameters['Client'] = {
           in: 'body',
           description: 'Client info',
           required: true,
           schema: {
             name: 'john doe',
             email: 'mail@mail.com',
             cpf: '11122233345'
           }
       }
     */

    const checkInBodySchema = z.object({
      name: z.string(),
      email: z.string(),
      cpf: z.string(),
    });

    const { name, email, cpf } = checkInBodySchema.parse(req.body);

    const client = await createClientService.execute({ name, email, cpf });

    return res.json(client);
  }

  async get(req: Request, res: Response): Promise<Response> {
    /*
       #swagger.tags = ['Client']
       #swagger.summary = 'Get client'
       #swagger.parameters['Client'] = {
           in: 'body',
           description: 'Client info',
           required: true,
           schema: {
             name: 'john doe',
             email: 'mail@mail.com',
             cpf: '11122233345'
           }
       }
     */

    const checkInBodySchema = z.object({
      cpf: z.string(),
    });

    const { cpf } = checkInBodySchema.parse(req.body);

    const client = await getClientService.execute(cpf);

    return res.json(client);
  }
}

export const clientController = new ClientController();
