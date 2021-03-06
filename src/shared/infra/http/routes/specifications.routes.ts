import { Router } from "express";

import { CreateSpecificationController } from "../../../../modules/cars/useCases/createSpecifications/CreateSpecificationsController";
import { ensureAdmin, ensureAuthenticate } from "../middlewares";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post(
  "/",
  ensureAuthenticate,
  ensureAdmin,
  createSpecificationController.handle
);

export { specificationsRoutes };
