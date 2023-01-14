import { HttpStatus } from "../../constant.js";
import userService from "./services/user.service.js";
import ErrorResponse from "../../utils/ErrorResponse.js";
import SuccessResponse from "../../utils/SuccessResponse.js";
const getProfile = async (req, res, next) => {
   try {
      const userProfile = await userService.getUserById(req.user.userId);
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

// đếm số lượng tài khoản sinh viên
const countStudent = async (req, res) => {
   try {
      const counts = await userService.countStudent();
      return res.status(HttpStatus.OK).send(new SuccessResponse(counts));
   } catch (error) {
      return res
         .status(HttpStatus.INTERNAL_SERVER_ERROR)
         .json(
            new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
         );
   }
};
// đếm số lượng tài khoản sinh viên
const countAdmin = async (req, res) => {
   try {
      const counts = await userService.countAdmin();
      return res.status(HttpStatus.OK).json(new SuccessResponse(counts));
   } catch (error) {
      return res
         .status(HttpStatus.INTERNAL_SERVER_ERROR)
         .json(
            new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
         );
   }
};
const getAdmin = async (req, res) => {
   try {
      let { pageSize, pageNumber, keyword, name, email } = req.query;
      const users = await userService.getAmin(
         pageSize,
         pageNumber,
         keyword,
         name,
         email
      );
      if (!users)
         res.status(HttpStatus.NOT_FOUND).json(
            new ErrorResponse(HttpStatus.NOT_FOUND, "Not found")
         );
      return res.status(HttpStatus.OK).json(new SuccessResponse(users));
   } catch (error) {
      return res
         .status(HttpStatus.INTERNAL_SERVER_ERROR)
         .json(
            new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
         );
   }
};
const getStudentByRoomId = async (req, res) => {
   try {
      let { roomId } = req.params;
      let { pageSize, pageNumber, keyword, name, email } = req.query;
      let user = await userService.getStudentByRoomId(
         roomId,
         pageSize,
         pageNumber,
         keyword,
         name,
         email
      );
      if (user)
         return res.status(HttpStatus.OK).json(new SuccessResponse(users));
   } catch (error) {
      return res
         .status(HttpStatus.INTERNAL_SERVER_ERROR)
         .json(
            new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
         );
   }
};
export default {
   getProfile,
   countStudent,
   countAdmin,
   getAdmin,
   getStudentByRoomId,
};
