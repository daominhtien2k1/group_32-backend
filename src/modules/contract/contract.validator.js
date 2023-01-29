import Joi from 'joi';
import { ContractStatus } from '../../constant.js';
const updateContract = {
    body: Joi.object({
        roomId: Joi.number().positive().required(),
        status: Joi.string().valid(...Object.values(ContractStatus)).required(),
        priceRoom: Joi.number().positive().required(),
        priceInternet: Joi.number().positive().required(),
        priceElectric: Joi.number().positive().required(),
        priceWater: Joi.number().positive().required(),
        priceParking: Joi.number().positive(),
    }),
    params: Joi.object({
        id: Joi.number().positive().required()
    }),
}
const updateContractStatus = {
    body: Joi.object({
        status: Joi.string().valid(...Object.values(ContractStatus)).required(),
    }),
    params: Joi.object({
        id: Joi.number().positive().required()
    }),
}

const deleteContract = {
    params: Joi.object({
        id: Joi.number().positive().required()
    }),
}
export default {
    updateContract,
    updateContractStatus,
    deleteContract
}