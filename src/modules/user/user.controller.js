import { HttpStatus } from "../../constant.js";
import userService from "./services/user.service.js";
import ErrorResponse from "../../utils/ErrorResponse.js";
import SuccessResponse from "../../utils/SuccessResponse.js";
import { hashString, checkHashedString } from '../../middlewares/bcrypt.js';
const getProfile = async (req, res, next) => {
   try {
      const userProfile = await userService.getUserById(req.user.id);
      delete userProfile.dataValues.password;
      return res
         .status(HttpStatus.OK)
         .json(new SuccessResponse(userProfile.dataValues));
   } catch (error) {
      return res
         .status(HttpStatus.INTERNAL_SERVER_ERROR)
         .json(
            new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
         );
   }
};

const updateProfile = async (req, res) => {
   try {
      const userId = req.user.id;
      const body = req.body;
      await userService.updateUserById(userId, body);
      const updatedUser = await userService.getUserById(userId);
      delete updatedUser.dataValues.password;
      return res.status(HttpStatus.OK).json(new SuccessResponse(updatedUser))
   } catch (error) {
      return res
         .status(HttpStatus.INTERNAL_SERVER_ERROR)
         .json(
            new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
         );
   }
}

const changePassword = async (req, res) => {
   try {
      const userId = req.user.id;
      const { newPassword, oldPassword } = req.body;
      const currentUser = await userService.getUserById(userId);
      if (!currentUser || !checkHashedString(oldPassword, currentUser.password)) {
         res.status(HttpStatus.BAD_REQUEST).json(new ErrorResponse(HttpStatus.BAD_REQUEST, 'Invalid password'))
         return;
      }

      await userService.updateUserById(userId, { password: hashString(newPassword) })
      const updatedUser = await userService.getUserById(userId);
      delete updatedUser.dataValues.password;
      return res.status(HttpStatus.OK).json(new SuccessResponse(updatedUser))
   } catch (error) {
      return res
         .status(HttpStatus.INTERNAL_SERVER_ERROR)
         .json(
            new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
         );
   }
}

const getUserList = async (req, res) => {
   try {
      const userList = await userService.getUserList(req.query);
      return res.status(HttpStatus.OK).json(new SuccessResponse(userList))
   } catch (error) {
      return res
         .status(HttpStatus.INTERNAL_SERVER_ERROR)
         .json(
            new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
         );
   }
}

export default {
   getProfile,
   updateProfile,
   changePassword,
   getUserList
};
