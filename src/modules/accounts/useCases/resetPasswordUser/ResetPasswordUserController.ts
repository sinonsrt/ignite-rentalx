import { Request, Response } from "express";
import { container } from "tsyringe";
import { ResetPasswordUserUseCase } from "./ResetPasswordUserUseCase";

class ResetPasswordUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token: refresh_token } = request.query;
    const { password } = request.body;
    const resetPasswordUserUseCase = container.resolve(
      ResetPasswordUserUseCase
    );
    console.log({ refresh_token });
    await resetPasswordUserUseCase.execute({
      token: refresh_token.toString(),
      password,
    });

    return response.send();
  }
}

export { ResetPasswordUserController };
