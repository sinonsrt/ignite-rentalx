import { ICreateCategoryDTO } from "../../dtos/ICreateCategoryDTO";
import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find(
      (categorie) => categorie.name === name
    );

    return category;
  }

  async list(): Promise<Category[]> {
    const { categories } = this;

    return categories;
  }

  async create({ description, name }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      description,
      name,
    });

    this.categories.push(category);
  }
}

export { CategoriesRepositoryInMemory };
