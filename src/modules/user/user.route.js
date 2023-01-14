import { UserRole } from "../../constant.js";
import { Router } from "express";
import userController from "./user.controller.js";
import { auth } from "../../middlewares/authenticate.js";
import { checkUserRole } from "../../middlewares/authorize.js";
import userValidator from "./user.validator.js";
import validate from "../../middlewares/validate.js";
const router = Router();

// router.get("/student/count", auth, userController.countStudent);
// router.get("/admin/count", auth, userController.countAdmin);
// router.get(
//    "/admins",
//    auth,
//    validate(userValidator.getAdmin),
//    userController.getAdmin
// );
// // chưa làm thiếu bảng liên kết giữa phòng với sinh viên
// router.get(
//    "/students/room/:roomId",
//    validate(userValidator.getStudentByRoomId),
//    auth,
//    userController.getStudentByRoomId
// );
router.get("/user",
   auth,
   checkUserRole([UserRole.ADMIN]),
   validate(userValidator.getUserList),
   userController.getUserList
)
router.get("/user/:id",
   auth,
   checkUserRole([UserRole.ADMIN]),
)
router.get("/user/room/:roomId",
   auth,
   checkUserRole([UserRole.ADMIN])
)
router.patch("/user/:id",
   auth,
   checkUserRole([UserRole.ADMIN]),
)
router.delete("/user/:id",
   auth,
   checkUserRole([UserRole.ADMIN])
)
router.get(
   "/profile",
   auth,
   checkUserRole([UserRole.STUDENT, UserRole.ADMIN]),
   userController.getProfile
);
router.patch("/profile",
   auth,
   checkUserRole([UserRole.STUDENT, UserRole.ADMIN]),
   userController.updateProfile
);
router.patch("/profile/password",
   auth,
   checkUserRole([UserRole.STUDENT, UserRole.ADMIN]),
   userController.changePassword
)
export default router;
