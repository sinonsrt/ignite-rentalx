import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/ListRentalsByUser/ListRentalsByUserController";
import { Router } from "express";
import { ensureAuthenticate } from "../middlewares";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalsRoutes.post("/", ensureAuthenticate, createRentalController.handle);
rentalsRoutes.post(
  "/devolutions/:id",
  ensureAuthenticate,
  devolutionRentalController.handle
);
rentalsRoutes.get(
  "/user",
  ensureAuthenticate,
  listRentalsByUserController.handle
);

export { rentalsRoutes };
