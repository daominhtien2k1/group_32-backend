import { Router } from "express";
import { UserRole } from "../../constant.js";
import validate from "../../middlewares/validate.js";
import * as roomController from "./room.controller.js";
import { auth } from "../../middlewares/authenticate.js";
import { checkUserRole } from "../../middlewares/authorize.js";
import * as roomValidator from "./room.validator.js";
const router = Router();
router.get(
   "/filter",
   auth,
   validate(roomValidator.getRoomByFilterAndPaging),
   roomController.getRoomByFilterAndPaging
);
router.get(
   "/:buildingId/:roomId",
   auth,
   validate(roomValidator.getById),
   roomController.getRoomById
);
router.post(
   "/:buildingId",
   auth,
   checkUserRole(UserRole.ADMIN),
   validate(roomValidator.create),
   roomController.createRoom
);
router.get(
   "/:buildingId",
   auth,
   validate(roomValidator.getAllRoomsByBuildingId),
   roomController.getAllRoomsByBuildingId
);
router.put(
   "/:buildingId/:roomId",
   auth,
   checkUserRole(UserRole.ADMIN),
   validate(roomValidator.update),
   roomController.updateRoom
);
router.delete(
   "/:roomId",
   auth,
   checkUserRole(UserRole.ADMIN),
   validate(roomValidator.softDeleteByid),
   roomController.softDeleteRoomgById
);
export default router;
