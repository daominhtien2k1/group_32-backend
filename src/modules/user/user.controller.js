import { HttpStatus } from "../../constant.js";
import userService from "./services/user.service.js"
import ErrorResponse from "../../utils/ErrorResponse.js";
import SuccessResponse from "../../utils/SuccessResponse.js";
const getProfile = async (req, res, next) => {
    try {
        const userProfile = await userService.getUserById(req.body.userId);
        delete userProfile.dataValues.password;
        res.status(HttpStatus.OK).send(new SuccessResponse(userProfile.dataValues))
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message))
    }
}

export default {
    getProfile
}