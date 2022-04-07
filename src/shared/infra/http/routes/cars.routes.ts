import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { Router } from "express";
import { ensureAdmin, ensureAuthenticate } from "../middlewares";

const carsRouter = Router();

const createCarController = new CreateCarController();

carsRouter.post(
  "/",
  ensureAuthenticate,
  ensureAdmin,
  createCarController.handle
);

export { carsRouter };
