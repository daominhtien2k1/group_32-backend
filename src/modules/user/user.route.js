import { UserRole } from "../../constant.js";
import { Router } from 'express';
import userController from "./user.controller.js";
import { auth } from '../../middlewares/authenticate.js';
import { checkUserRole } from '../../middlewares/authorize.js';
const router = Router();
router.get('/', auth, checkUserRole(UserRole.STUDENT), userController.getProfile);
export default router; 
