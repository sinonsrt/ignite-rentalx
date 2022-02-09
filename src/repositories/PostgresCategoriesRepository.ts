import { Category } from "../model/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "./ICategoriesRepository";

class PostgresCategoryRepository implements ICategoriesRepository {
  findByName(name: string): Category {
    console.log("findByName ", { name });
    return null;
  }

  list(): Category[] {
    return null;
  }

  create({ description, name }: ICreateCategoryDTO): void {
    console.log("create ", { description, name });
    return null;
  }
}

export { PostgresCategoryRepository };
