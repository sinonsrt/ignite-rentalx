import { ICategoriesRepository } from "../modules/cars/repositories/ICategoriesRepository";

interface IRequest {
  description: string;
  name: string;
}

class CreateCategoryService {
  // categoriesRepository needs to be private to execute access
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ description, name }: IRequest): void {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error("Category already exists!");
    }

    this.categoriesRepository.create({ description, name });
  }
}

export { CreateCategoryService };
