import Joi from "joi";

const create = {
   body: Joi.object({
      name: Joi.string().trim().required(),
      address: Joi.string().trim().required(),
   }),
};
const update = {
   params: Joi.object({
      buildingId: Joi.required(),
   }),
   body: Joi.object({
      name: Joi.string().required().trim(),
      address: Joi.string().required().trim(),
   }),
};
const getById = {
   params: Joi.object({
      buildingId: Joi.required(),
   }),
};
const softDeleteByid = {
   params: Joi.object({
      buildingId: Joi.required(),
   }),
};

export { create, update, getById, softDeleteByid };
