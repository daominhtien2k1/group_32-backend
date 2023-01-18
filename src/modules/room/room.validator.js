import Joi from "joi";
// "name",
// "buildingId",
// "capacity",
// "price",
const create = {
   body: Joi.object({
      name: Joi.string().trim().required(),
      buildingId: Joi.number().integer().required(),
      capacity: Joi.number().integer().required(),
      price: Joi.number().integer().required(),
      userId: Joi.required(),
      role: Joi.required(),
   }),
};
const update = {
   params: Joi.object({
      buildingId: Joi.number().integer().required(),
      roomId: Joi.number().integer().required(),
   }),
   body: Joi.object({
      name: Joi.string().trim().required(),
      capacity: Joi.number().integer().required(),
      price: Joi.number().integer().required(),
      userId: Joi.required(),
      role: Joi.required(),
   }),
};
const getById = {
   params: Joi.object({
      roomId: Joi.number().integer().required(),
   }),
};
const getAllRoomsByBuildingId = {
   params: Joi.object({
      buildingId: Joi.number().integer().required(),
   }),
};
const softDeleteById = {
   params: Joi.object({
      roomId: Joi.number().integer().required(),
   }),
};
const getListRoom = {
   query: Joi.object({
      page: Joi.number().positive(),
      limit: Joi.number().positive(),
      keyword: Joi.string().trim(),
      buildingId: Joi.number().integer(),
   }),
};
export {
   create,
   update,
   getById,
   softDeleteById,
   getAllRoomsByBuildingId,
   getListRoom,
};
