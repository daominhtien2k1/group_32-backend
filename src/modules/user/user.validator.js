import Joi from "joi";
// define user validator here

const getAdmin = {
   query: Joi.object().keys({
      pageSize: Joi.number().integer().min(1).optional(),
      pageNumber: Joi.number().integer().min(1).optional(),
      keyword: Joi.string().optional().allow(""),
      name: Joi.string().optional().allow(""),
      email: Joi.string().optional().allow(""),
   }),
};
const getStudentByRoomId = {
   params: Joi.object().keys({
      roomId: Joi.number().integer(),
   }),
   query: Joi.object().keys({
      pageSize: Joi.number().integer().min(1).optional(),
      pageNumber: Joi.number().integer().min(1).optional(),
      keyword: Joi.string().optional().allow(""),
      name: Joi.string().optional().allow(""),
      email: Joi.string().optional().allow(""),
   }),
};
export { getAdmin, getStudentByRoomId };
