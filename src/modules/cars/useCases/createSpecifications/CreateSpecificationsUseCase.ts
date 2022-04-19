import { inject, injectable } from "tsyringe";

import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  description: string;
  name: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private SpecificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ description, name }: IRequest): Promise<void> {
    const specificationAlreadyExists =
      await this.SpecificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError("Category already exists!");
    }

    await this.SpecificationsRepository.create({ description, name });
  }
}

export { CreateSpecificationUseCase };
