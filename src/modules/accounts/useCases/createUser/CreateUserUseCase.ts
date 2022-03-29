import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    password,
    username,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    this.usersRepository.create({
      name,
      password,
      username,
      email,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
