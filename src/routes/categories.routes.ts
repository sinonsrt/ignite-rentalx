import { Router } from "express";

import { PostgresCategoryRepository } from "../modules/cars/repositories/PostgresCategoriesRepository";
import { CreateCategoryService } from "../services/CreateCategoryService";

const categoriesRoutes = Router();
const categoriesRepository = new PostgresCategoryRepository();

categoriesRoutes.post("/", (request, response) => {
  const { description, name } = request.body;

  const createCategoryService = new CreateCategoryService(categoriesRepository);
  createCategoryService.execute({ description, name });

  return response.status(201).send();
});

categoriesRoutes.get("/", (request, response) => {
  const categoriesList = categoriesRepository.list();

  return response.status(200).json(categoriesList);
});

export { categoriesRoutes };
