import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const specificationsRoutes = Router();

const createSpecificationController = new CreateCategoryController();

specificationsRoutes.post("/", ensureAuthenticated, ensureAdmin, createSpecificationController.handle);

export { specificationsRoutes };