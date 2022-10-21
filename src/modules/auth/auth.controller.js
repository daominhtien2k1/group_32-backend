import { HttpStatus } from '../../constant.js';
import authService from './services/auth.service.js';
import userService from '../user/services/user.service.js';
import ErrorResponse from '../../utils/ErrorResponse.js';
import SuccessResponse from '../../utils/SuccessResponse.js';

const register = async (req, res) => {
    try {
        const newUser = await userService.createUser(req.body);
        res.status(HttpStatus.OK).json(new SuccessResponse(newUser))
        return;
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json(new ErrorResponse(HttpStatus.BAD_REQUEST, error.message))
        return;
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authService.login(email, password);
        res.status(HttpStatus.OK).json(new SuccessResponse({ user }))
        return;
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json(new ErrorResponse(HttpStatus.BAD_REQUEST, error.message))
        return;
    }
}

export default { register, login }