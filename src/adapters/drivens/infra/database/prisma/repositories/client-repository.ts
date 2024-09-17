import { IClientRepository } from "@application/clients/application/ports/repositories/Iclient-repository";

import { CreateClientDTO } from "@application/clients/application/ports/repositories/dtos/client-dto";
import { Client } from "@application/domain/clients/entities/client-entity";
import { prisma } from "../prisma-client";



export default class ClientRepository implements IClientRepository {
  async findById(id: string): Promise<Client | null> {
    const client = await prisma.client.findUnique({ where: { id: id } });

    if (client) {
      return new Client(client);
    } else {
      return null;
    }
  }

  async findByEmail(email: string): Promise<Client | null> {
    const clients = await prisma.client.findMany({
      where: { email: email },
    });

    if (clients.length === 0) {
      return null;
    }

    if (clients.length > 1) {
      console.warn(
        `Multiple clients found with email ${email}. Returning the first one.`
      );
    }

    return new Client(clients[0]);
  }

  async findByCpf(cpf: string): Promise<Client | null> {
    const client = await prisma.client.findUnique({ where: { cpf: cpf } });

    if (client) {
      return new Client(client);
    } else {
      return null;
    }
  }

  async create({ id, name, email, cpf }: CreateClientDTO): Promise<Client> {
    const client = new Client({
      id,
      name:name as any,
      email:email as any,
      cpf:cpf as any,
      status: true,
      created_at: new Date(),
    });

    await prisma.client.create({
      data: {
        name: client.name,
        email: client.email,
        cpf: client.cpf,
        id: client.id.toString(),
      },
    });

    return client;
  }
}