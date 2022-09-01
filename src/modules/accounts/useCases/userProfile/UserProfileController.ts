import { Request, Response } from "express";
import { container } from "tsyringe";
import { UserProfileUseCase } from "./UserProfileUseCase";

class UserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const profileUserUseCase = container.resolve(UserProfileUseCase);

    const userProfile = await profileUserUseCase.execute(id);

    return response.json(userProfile);
  }
}
export { UserProfileController };
