import { AppError } from "@shared/errors/AppError";
import { User } from "@application/user-exemple/domain/user";
import { IUserRepository } from "../ports/repositories/IUserRepository";

interface IRequest {
  user_id: string;
}
export class ShowProfileService {
  constructor(private userRepository: IUserRepository) {}

  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id);
    if (!user) {
      throw new AppError("User not found");
    }

    return user;
  }
}

// import { Client } from "@application/user-exemple/domain/client";
// import { IClientRepository } from "../ports/repositories/IClientRepository";

// interface IRequestClient {
//   cpf: string;
// }

// export class ShowClientProfileService {
//   constructor(private clientRepository: IClientRepository) {}

//   public async execute({ cpf }: IRequestClient): Promise<Client> {
//     const client = await this.clientRepository.findByCpf(cpf);
//     if (!client) {
//       throw new AppError("Client not found");
//     }

//     return client;
//   }
// }
