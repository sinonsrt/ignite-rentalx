import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "@modules/cars/useCases/createCategory/CreateCategoryUseCase";
import { AppError } from "@shared/errors/AppError";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

const categoryMock = {
  name: "Test Category",
  description: "Category description test",
};
describe("Create category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("Should be able to create a new category", async () => {
    await createCategoryUseCase.execute(categoryMock);

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      categoryMock.name
    );

    expect(categoryCreated).toHaveProperty("id");
  });

  it("Should not be able to create a new duplicate category", async () => {
    expect(async () => {
      await createCategoryUseCase.execute(categoryMock);
      await createCategoryUseCase.execute(categoryMock);
    }).rejects.toBeInstanceOf(AppError);
  });
});
