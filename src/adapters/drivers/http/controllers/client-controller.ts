import { ClientServiceImpl } from "@application/clients/application/service/clientService";
import { Request, Response } from "express";
import ClientRepository from "src/adapters/drivens/infra/repositories/clientRepository";
import { z } from "zod";

const clientRepository = new ClientRepository();
const clientService = new ClientServiceImpl(clientRepository);

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

    const client = await clientService.create({ name, email, cpf });

    return res.json(client);
  }

  async getByCpf(req: Request, res: Response): Promise<Response> {
    /*
       #swagger.tags = ['Client']
       #swagger.summary = 'Get client by CPF'
       #swagger.parameters['cpf'] = {
           in: 'path',
           description: 'Client CPF',
           required: true
       }
     */

    const { cpf } = req.params;

    const client = await clientService.findByCpf(cpf);

    return res.json(client);
  }

  async getByEmail(req: Request, res: Response): Promise<Response> {
    /*
       #swagger.tags = ['Client']
       #swagger.summary = 'Get client by email'
       #swagger.parameters['email'] = {
           in: 'path',
           description: 'Client email'
       }
     */

    const checkInBodySchema = z.object({
      email: z.string(),
    });

    const { email } = checkInBodySchema.parse(req.body);

    const client = await clientService.findByEmail(email);

    return res.json(client);
  }

  async getById(req: Request, res: Response): Promise<Response> {
    /*
       #swagger.tags = ['Client']
       #swagger.summary = 'Get client by ID'
       #swagger.parameters['id'] = {
           in: 'path',
           description: 'Client ID',
           required: true
       }
     */

    const checkInBodySchema = z.object({
      id: z.string(),
    });

    const { id } = checkInBodySchema.parse(req.body);

    const client = await clientService.findById(id);

    return res.json(client);
  }
}

export const clientController = new ClientController();
