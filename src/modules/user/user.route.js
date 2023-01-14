import { UserRole } from "../../constant.js";
import { Router } from "express";
import userController from "./user.controller.js";
import { auth } from "../../middlewares/authenticate.js";
import { checkUserRole } from "../../middlewares/authorize.js";
import * as userValidator from "./user.validator.js";
import validate from "../../middlewares/validate.js";
const router = Router();
// đếm số lượng tài khoản sinh viên
router.get("/student/count", auth, userController.countStudent);

// đếm số lượng tài khoản admin
router.get("/admin/count", auth, userController.countAdmin);

// danh sách admin
router.get(
   "/admins",
   auth,
   validate(userValidator.getAdmin),
   userController.getAdmin
);
// chưa làm thiếu bảng liên kết giữa phòng với sinh viên
router.get(
   "/students/room/:roomId",
   validate(userValidator.getStudentByRoomId),
   auth,
   userController.getStudentByRoomId
);
router.get(
   "/",
   auth,
   checkUserRole(UserRole.STUDENT),
   userController.getProfile
);
export default router;
