import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "@shared/errors/AppError";

import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";

interface IPayload {
  sub: string;
}

const ensureAuthenticate = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing!", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const { sub: user_id } = verify(
      token,
      process.env.JWT_SECRET_KET
    ) as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("Invalid user!", 401);
    }

    request.user = {
      id: user_id,
    };

    next();
  } catch (error) {
    throw new AppError("Invalid token!", 401);
  }
};

export { ensureAuthenticate };
