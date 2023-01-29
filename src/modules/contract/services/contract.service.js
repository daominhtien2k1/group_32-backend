import db from "../../../../models/index.cjs";
const Contract = db.Contract

const insertContract = async (insertContractBody) => {
    try {
        const newContract = await Contract.create(insertContractBody);
        return newContract;
    } catch (error) {
        throw error;
    }
}

const updateContractById = async (id, updateBody) => {
    try {
        return await Contract.update(updateBody, {
            where: {
                id,
            },
        });
    } catch (error) {
        throw error;
    }
};

export default {
    insertContract,
    updateContractById
}