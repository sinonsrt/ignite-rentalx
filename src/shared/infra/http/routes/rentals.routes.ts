import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { Router } from "express";
import { ensureAuthenticate } from "../middlewares";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalsRoutes.post("/", ensureAuthenticate, createRentalController.handle);
rentalsRoutes.post(
  "/devolutions/:id",
  ensureAuthenticate,
  devolutionRentalController.handle
);

export { rentalsRoutes };
