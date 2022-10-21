import userService from "../../user/services/user.service.js";
import bcrypt from 'bcrypt';

const login = async (email, password) => {
    const user = await userService.getUserByEmail(email);

    if (!user || !bcrypt.compare(password, user.password)) {
        throw new Error('Incorrect email or password')
    }
    return user;
}

export default {
    login,
}