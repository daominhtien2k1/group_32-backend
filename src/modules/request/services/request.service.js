import db from "../../../../models/index.cjs"
const Request = db.request;

const getRequestById = async (id) => {
    try {
        return await Request.findOne({
            where: {
                id,
                deletedAt: null
            }
        })
    } catch (error) {
        throw error
    }
}

const getRequestListByStudentId = async (studentId) => {
    try {
        const requestList = await Request.findAll({
            where: {
                studentId,
                deletedAt: null
            }
        })
        const totalItems = await Request.count({
            where: {
                studentId,
                deletedAt: null
            }
        })
        return { items: requestList, totalItems };
    } catch (error) {
        throw error;
    }
}

const getAllRequestList = async () => {
    try {
        const requestList = await Request.findAll({
            where: {
                deletedAt: null
            }
        })
        const totalItems = await Request.count({
            where: {
                deletedAt: null
            }
        })
        return { items: requestList, totalItems };
    } catch (error) {
        throw error;
    }
}

const insertRequest = async (body) => {
    try {
        const newRequest = await Request.create(body);
        return newRequest
    } catch (error) {
        throw error;
    }
}

const updateRequestById = async (id, body) => {
    try {
        await Request.update({ ...body, updatedAt: new Date() }, {
            where: {
                id,
                deletedAt: null
            }
        });
        return await getRequestById(id);
    } catch (error) {
        throw error;
    }
}


const softDeleteRequestById = async (id) => {
    try {
        return await Request.destroy({
            where: {
                id,
            },
        });
    } catch (error) {
        throw error;
    }
};

export default {
    insertRequest,
    getRequestListByStudentId,
    getAllRequestList,
    getRequestById,
    updateRequestById,
    softDeleteRequestById,
}