import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  description: string;
  name: string;
}

class CreateCategoryUseCase {
  // categoriesRepository needs to be private to execute access
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute({ description, name }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new Error("Category already exists!");
    }

    this.categoriesRepository.create({ description, name });
  }
}

export { CreateCategoryUseCase };
