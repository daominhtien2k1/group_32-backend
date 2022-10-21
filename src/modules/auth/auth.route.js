import { Router } from 'express';
import validate from '../../middlewares/validate.js';
import authValidator from './auth.validator.js';
import authController from './auth.controller.js';

const router = Router();

router.post('/register', validate(authValidator.register), authController.register);
router.post('/login', validate(authValidator.login), authController.login);

export default router; 