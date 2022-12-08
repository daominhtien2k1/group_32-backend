import { Router } from "express";
import validate from "../../middlewares/validate.js";
import authValidator from "./auth.validator.js";
import authStudentController from "./auth.student.controller.js";

const router = Router();

/**
 * Student route
 */
router.post(
   "/register",
   validate(authValidator.register),
   authStudentController.register
);
router.post(
   "/send-verification-email",
   validate(authValidator.sendVerificationEmail),
   authStudentController.sendVerificationEmail
);
router.post(
   "/verify-email",
   validate(authValidator.verifyEmail),
   authStudentController.verifyEmail
);
router.post(
   "/login",
   validate(authValidator.login),
   authStudentController.login
);
router.post(
   "/refresh-token",
   validate(authValidator.refreshTokens),
   authStudentController.refreshTokens
);
// router.post('/forgot-password', validate(authValidator.forgotPassword), authStudentController);
// router.post('/reset-password', validate(authValidator.resetPassword), authStudentController.resetPassword);

/**
 * Admin route
 */
router.post(
   "/admin/login",
   validate(authValidator.login),
   authStudentController.adminLogin
);

export default router;
