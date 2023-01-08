import Joi from "joi";

const create = {
   body: Joi.object({
      name: Joi.string().trim().required(),
      address: Joi.string().trim().required(),
      userId: Joi.required(),
      role: Joi.required(),
   }),
};
const update = {
   params: Joi.object({
      buildingId: Joi.required(),
   }),
   body: Joi.object({
      name: Joi.string().required().trim(),
      address: Joi.string().required().trim(),
      userId: Joi.required(),
      role: Joi.required(),
   }),
};
const getById = {
   params: Joi.object({
      buildingId: Joi.number().integer().required(),
   }),
};
const softDeleteByid = {
   params: Joi.object({
      buildingId: Joi.number().integer().required(),
   }),
};
const getBuildingByFilterAndPaging = {
   query: Joi.object().keys({
      pageSize: Joi.number().integer().min(1).optional(),
      pageNumber: Joi.number().integer().min(1).optional(),
      keyword: Joi.string().optional().allow(""),
   }),
};
export {
   create,
   update,
   getById,
   softDeleteByid,
   getBuildingByFilterAndPaging,
};
