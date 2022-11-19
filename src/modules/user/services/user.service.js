import db from "../../../../models/index.cjs";
import { softDeleteCondition } from "../../../constant.js";
const User = db.user;

const userAttribute = ['id', 'name', 'email', 'role', 'status', 'createdAt', 'updatedAt', 'deletedAt']

const createUser = async (createUserBody) => {
    try {
        const newUser = await User.create(createUserBody);
        delete newUser.password;
        return newUser
    } catch (error) {
        throw error;
    }
}

const getUserById = async (id) => {
    try {
        return await User.findOne({
            where: {
                id,
            },
        })
    } catch (error) {
        throw error;
    }
}

const getUserByEmail = async (email) => {
    try {
        return await User.findOne({
            where: {
                email,
            },
        })
    } catch (error) {
        throw error
    }
}


const updateUserById = async (updateBody) => {
    try {
        return await User.update(updateBody, {
            where: {
                id: updateBody.userId,
            }
        });
    } catch (error) {
        throw error;
    }
}

export default {
    createUser,
    getUserById,
    getUserByEmail,
    updateUserById
}