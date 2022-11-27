import { Router } from "express";
import { UserRole } from "../../constant.js";
import validate from "../../middlewares/validate.js";
import * as buildingController from "./building.controller.js";
import { auth } from "../../middlewares/authenticate.js";
import { checkUserRole } from "../../middlewares/authorize.js";
import * as buildingValidator from "./building.validator.js";
const router = Router();
router.get(
   "/:buildingId",
   validate(buildingValidator.getById),
   buildingController.getBuildingById
);
router.post(
   "/",
   validate(buildingValidator.create),
   buildingController.createBuilding
);
router.get("/", buildingController.getAllBuildings);
router.put(
   "/:buildingId",
   validate(buildingValidator.update),
   buildingController.updateBuilding
);
router.delete(
   "/:buildingId",
   validate(buildingValidator.softDeleteByid),
   buildingController.softDeleteBuildingById
);
export default router;
