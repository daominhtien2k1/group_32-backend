import Joi from "joi";

const createComplain = {
   body: Joi.object({
      type: Joi.string().required(),
      content: Joi.string().required(),
      level: Joi.string().required(),
   }),
};
const getComplainList = {
   query: Joi.object().keys({
      page: Joi.number().positive(),
      limit: Joi.number().positive(),
      type: Joi.string()
         .valid(...["CT1", "CT2", "CT3"])
         .optional(),
      level: Joi.array()
         .valid(...["CL1", "CL2"])
         .optional(),
   }),
};
const updateComplain = {
   params: Joi.object().keys({
      id: Joi.number().positive(),
   }),
   body: Joi.object().keys({
      type: Joi.string().required(),
      content: Joi.string().required(),
      level: Joi.string().required(),
   }),
};
export { createComplain, getComplainList, updateComplain };
