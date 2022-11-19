import ErrorResponse from '../utils/ErrorResponse.js';
import { HttpStatus } from '../constant.js';

const validate = (schema) => (req, res, next) => {
    try {
        let result;
        if (schema?.params) {
            result = schema.params.validate(req.params);
            if (result.error) {
                return next(new ErrorResponse(HttpStatus.BAD_REQUEST, result.error));
            }
        }
        result = schema.body.validate(req.body);
        if (result.error) {
            res.status(HttpStatus.BAD_REQUEST).send(new ErrorResponse(HttpStatus.BAD_REQUEST, result.error.details));
        } else {
            next();
        }
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message));
    }
};

export default validate;