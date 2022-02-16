import { Request, Response } from "express";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

  handle(request: Request, response: Response): Response {
    const categoriesList = this.listCategoriesUseCase.execute();

    return response.status(200).json(categoriesList);
  }
}

export { ListCategoriesController };
