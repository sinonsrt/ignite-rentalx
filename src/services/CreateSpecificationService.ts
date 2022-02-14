import { ISpecificationRepository } from "../modules/cars/repositories/ISpecificationsRepostiry";

interface IRequest {
  description: string;
  name: string;
}

class CreateSpecificationService {
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

export { CreateSpecificationService };
