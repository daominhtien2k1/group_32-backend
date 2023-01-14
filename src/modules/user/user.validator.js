import Joi from "joi";
import { MIN_PASSWORD_CHARACTER, UserRole, UserStatus } from '../../constant.js';
// define user validator here

// const getAdmin = {
//    query: Joi.object().keys({
//       pageSize: Joi.number().integer().min(1).optional(),
//       pageNumber: Joi.number().integer().min(1).optional(),
//       keyword: Joi.string().optional().allow(""),
//       name: Joi.string().optional().allow(""),
//       email: Joi.string().optional().allow(""),
//    }),
// };
// const getStudentByRoomId = {
//    params: Joi.object().keys({
//       roomId: Joi.number().integer(),
//    }),
//    query: Joi.object().keys({
//       pageSize: Joi.number().integer().min(1).optional(),
//       pageNumber: Joi.number().integer().min(1).optional(),
//       keyword: Joi.string().optional().allow(""),
//       name: Joi.string().optional().allow(""),
//       email: Joi.string().optional().allow(""),
//    }),
// };
const updateProfile = {
   body: Joi.object({
      name: Joi.string().required().trim(),
      studentCode: Joi.string().required().trim(),
   })
}

const changePassword = {
   body: Joi.object({
      oldPassword: Joi.string().min(MIN_PASSWORD_CHARACTER).required(),
      newPassword: Joi.string().min(MIN_PASSWORD_CHARACTER).required(),
   })
}

const getUserList = {
   query: Joi.object({
      page: Joi.number().positive(),
      limit: Joi.number().positive(),
      keyword: Joi.string().trim(),
      role: Joi.array().items(Joi.string().valid(...Object.values(UserRole))),
      status: Joi.array().items(Joi.string().valid(...Object.values(UserStatus))),
   })
}

export default {
   updateProfile,
   changePassword,
   getUserList
};
