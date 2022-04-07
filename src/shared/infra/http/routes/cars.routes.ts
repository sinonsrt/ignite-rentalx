import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { Router } from "express";

const carsRouter = Router();

const createCarController = new CreateCarController();

carsRouter.post("/", createCarController.handle);

export { carsRouter };
