import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

import { IRequest, IResponse } from "../../dtos/IAuthenticateUserDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import auth from "@config/auth";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: DayjsDateProvider
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    const {
      expires_in_token,
      expires_in_refresh_token,
      expires_in_refresh_token_days,
    } = auth;

    if (!user) {
      throw new AppError("Email or password incorrect!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!");
    }

    const token = sign({}, process.env.JWT_SECRET_KEY, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    const refresh_token = sign({ email }, process.env.JWT_SECRET_REFRESH_KEY, {
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    });

    await this.usersTokensRepository.create({
      expires_date: this.dayjsDateProvider.addDays(
        expires_in_refresh_token_days
      ),
      refresh_token,
      user_id: user.id,
    });

    return {
      token,
      refresh_token,
      user: {
        name: user.name,
        email: user.email,
      },
    };
  }
}

export { AuthenticateUserUseCase };
