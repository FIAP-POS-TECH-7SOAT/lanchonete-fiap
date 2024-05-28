import { IClientRepository } from "@application/clients/application/ports/repositories/client-repository";
import { Client } from "@application/clients/domain/client-entity";
import { CreateClientDTO } from "@application/clients/application/ports/repositories/dtos/client-dto";

import { prisma } from "@shared/lib/prisma";

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

  async create({ name, email, cpf }: CreateClientDTO): Promise<Client> {
    const client = new Client({
      name,
      email,
      cpf,
      status: true,
      created_at: new Date(),
    });

    await prisma.client.create({
      data: {
        name: client.name,
        email: client.email,
        cpf: client.cpf,
        id: client.id,
      },
    });

    return client;
  }
}
