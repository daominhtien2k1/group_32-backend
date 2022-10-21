import Joi from 'joi';
import { MIN_PASSWORD_CHARACTER } from '../../constant.js';

const register = {
    body: Joi.object({
        email: Joi.string().lowercase().required().trim(),
        password: Joi.string().min(MIN_PASSWORD_CHARACTER).required(),
        name: Joi.string().required().trim(),
    })
};

const login = {
    body: Joi.object({
        email: Joi.string().lowercase().required().trim(),
        password: Joi.string().min(MIN_PASSWORD_CHARACTER).required(),
    })
};

export default {
    register,
    login,
}