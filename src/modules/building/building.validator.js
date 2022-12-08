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

export { create, update, getById, softDeleteByid };
