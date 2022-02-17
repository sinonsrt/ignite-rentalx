import { ISpecificationRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  description: string;
  name: string;
}

class CreateSpecificationUseCase {
  constructor(private specificationRepository: ISpecificationRepository) {}

  execute({ description, name }: IRequest): void {
    const specificationAlreadyExists =
      this.specificationRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error("Category already exists!");
    }

    this.specificationRepository.create({ description, name });
  }
}

export { CreateSpecificationUseCase };
