
import { User } from "../../../domain/user";
import { CreateUserDTO } from "./dtos/create-user-dto";

export interface IUserRepository {
  findById(id: string): Promise<User |null>;
  findByEmail(email: string): Promise<User |null>;
  create(data: CreateUserDTO): Promise<User>;
}
