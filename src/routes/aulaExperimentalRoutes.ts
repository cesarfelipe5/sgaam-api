import { Router } from "express";
import { aulaExperimentalController } from "../controllers";
import { aulaExperimentalMiddleware } from "../middlewares";

const aulaExperimentalRouter = Router();

aulaExperimentalRouter.get("/", aulaExperimentalController.listOrSearch);

aulaExperimentalRouter.get("/:id", aulaExperimentalController.byId);

aulaExperimentalRouter.post(
  "/",
  aulaExperimentalMiddleware.validateCreate,
  aulaExperimentalController.create
);

aulaExperimentalRouter.put(
  "/:id",
  aulaExperimentalMiddleware.validateUpdate,
  aulaExperimentalController.update
);

aulaExperimentalRouter.delete(
  "/:id",
  aulaExperimentalMiddleware.validateRemove,
  aulaExperimentalController.remove
);

export { aulaExperimentalRouter };
