import { Router } from "express"
import { checkUserRole } from "../../middlewares/authorize.js"
import { UserRole } from "../../constant.js"
import validate from "../../middlewares/validate.js"
import { auth } from "../../middlewares/authenticate.js"
import billingController from './billing.controller.js'

const router = Router();

router.get("/",
    auth,
    checkUserRole([UserRole.ADMIN, UserRole.STUDENT]),
    billingController.getBillingList
)

export default router