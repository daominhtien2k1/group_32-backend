import db from "../../../../models/index.cjs";
const User = db.user;

const createUser = async (createUserBody) => {
    try {
        return await User.create(createUserBody);
    } catch (error) {
        throw error;
    }
}

const getUserById = async (id) => {
    try {
        return await User.findOne({
            where: {
                id
            }
        })
    } catch (error) {
        throw error;
    }
}

const getUserByEmail = async (email) => {
    try {
        return await User.findOne({
            where: {
                email
            }
        })
    } catch (error) {
        throw error
    }
}

export default {
    createUser,
    getUserById,
    getUserByEmail,
}