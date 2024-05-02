import { Client } from "@application/Clients/domain/client";
import { IClientRepository } from "../ports/repositories/IClientRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  email: string;
  cpf: string;
}

interface IResponse extends Omit<Client, "cpf"> {}

export class CreateClientService {
  constructor(private clientRepository: IClientRepository) {}

  public async execute({ name, email, cpf }: IRequest): Promise<IResponse> {
    const checkClientCpfExists = await this.clientRepository.findByCpf(cpf);

    if (checkClientCpfExists) {
      throw new AppError("CPF alredy exist");
    }

    const client = await this.clientRepository.create({
      name,
      email,
      cpf,
    });

    return client;
  }
}

export class GetClientService {
  constructor(private clientRepository: IClientRepository) {}

  public async execute(cpf: string): Promise<IRequest | null> {
    const client = await this.clientRepository.findByCpf(cpf);

    if (!client) {
      throw new AppError("Client not found");
    } else {
      return client;
    }
  }
}
