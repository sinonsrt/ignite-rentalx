import { Router } from "express";

import { ensureAuthenticate } from "../middlewares";
import { authenticateRoutes } from "./authenticate.routes";
import { carsRouter } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/categories", ensureAuthenticate, categoriesRoutes);
router.use("/specifications", ensureAuthenticate, specificationsRoutes);
router.use("/users", usersRoutes);
router.use("/cars", carsRouter);
router.use(authenticateRoutes);

export { router };
