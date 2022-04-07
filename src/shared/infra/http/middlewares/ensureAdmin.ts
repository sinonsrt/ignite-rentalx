import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";

const ensureAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { id } = request.user;

  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(id);

  if (!user.admin) {
    throw new AppError("You must be an admin!", 401);
  }

  return next();
};

export { ensureAdmin };
