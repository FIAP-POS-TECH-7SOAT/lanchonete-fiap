
import { isValidCPF } from "@brazilian-utils/brazilian-utils";
import { IClientRepository } from "../ports/repositories/Iclient-repository";

import { AppError } from "@shared/errors/AppError";
import { Client } from "@application/clients/domain/client-entity";

interface IRequest {
  id:string,
  name:string, 
  email:string, 
  cpf:string
}
interface IResponse extends Client {}

export class CreateClientUseCase {
  constructor(private clientRepository: IClientRepository) {}

  public async execute({
    id,
    cpf,
    email,
    name
  }: IRequest): Promise<IResponse> {
    if(!isValidCPF(cpf)){
      throw new AppError('CPF invalido')
    }
    let client = await this.clientRepository.findByCpf(cpf)
    if(client){
      return client
    }

    client = await this.clientRepository.create({
      id,
      cpf,
      name,
      email
    });

    return client;
  }
}
