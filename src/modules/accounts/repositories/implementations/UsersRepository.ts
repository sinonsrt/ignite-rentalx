import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    password,
    username,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const user = {
      name,
      password,
      username,
      email,
      driver_license,
    };

    await this.repository.save(user);
  }
}

export { UsersRepository };