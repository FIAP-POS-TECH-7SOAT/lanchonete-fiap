import { IUserRepository } from "@application/user-exemple/application/ports/repositories/IUserRepository";
import { CreateUserDTO } from "@application/user-exemple/application/ports/repositories/dtos/create-user-dto";
import { User } from "@application/user-exemple/domain/user";



export default class UserRepository implements IUserRepository {
  findById(id: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  findByEmail(email: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  create(data: CreateUserDTO): Promise<User> {
    throw new Error("Method not implemented.");
  }

}
