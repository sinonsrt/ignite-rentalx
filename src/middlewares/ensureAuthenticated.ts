import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

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
    throw new Error("Token missing!");
  }

  const token = authHeader.split(" ")[1];

  try {
    const { sub } = verify(token, process.env.JWT_SECRET_KET) as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(sub);

    if (!user) {
      throw new Error("Invalid user!");
    }

    next();
  } catch (error) {
    throw new Error("Invalid token!");
  }
};

export { ensureAuthenticate };
