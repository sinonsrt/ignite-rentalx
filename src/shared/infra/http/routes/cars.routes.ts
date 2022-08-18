import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationsController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/listAvailableCarsController";
import { UploadCarImageController } from "@modules/cars/useCases/uploadCarImages/UploadCarImagesController";
import { Router } from "express";
import { ensureAdmin, ensureAuthenticate } from "../middlewares";
import uploadConfig from "../../../../config/upload";
import multer from "multer";

const carsRouter = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImageController = new UploadCarImageController();

const upload = multer(uploadConfig);

carsRouter.post(
  "/",
  ensureAuthenticate,
  ensureAdmin,
  createCarController.handle
);

carsRouter.get("/available", listAvailableCarsController.handle);

carsRouter.post(
  "/specifications/:id",
  ensureAuthenticate,
  ensureAdmin,
  createCarSpecificationController.handle
);

carsRouter.post(
  "/images/:id",
  ensureAuthenticate,
  ensureAdmin,
  upload.array("images"),
  uploadCarImageController.handle
);

export { carsRouter };
