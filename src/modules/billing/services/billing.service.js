import db from "../../../../models/index.cjs";
const Billing = db.billing;

const getBillingById = async (id) => {
    try {
        return await Billing.findOne({
            where: { id }
        })
    } catch (error) {
        throw error;
    }
}

const getBillingListByStudentId = async (studentId) => {
    try {
        const data = await Billing.findAndCountAll({
            where: {
                studentId,
            }
        });
        return { items: data.rows, totalItems: data.count }
    } catch (error) {
        throw error;
    }
}

const getBillingList = async () => {
    try {
        const data = await Billing.findAndCountAll();
        return { items: data.rows, totalItems: data.count }
    } catch (error) {
        throw error;

    }
}
const insertBilling = async (insertBody) => {
    try {
        return await Billing.create(insertBody);
    } catch (error) {
        throw error;
    }
}
const bulkCreateBilling = async (bulkCreateBody) => {
    try {
        return await Billing.bulkCreate(bulkCreateBody);
    } catch (error) {
        throw error;
    }
}

const updateBillingById = async (id, updateBody) => {
    try {
        await Billing.update(updateBody, {
            where: {
                id,
            },
        });
        return await getBillingById(id)
    } catch (error) {
        throw error;
    }
};
const deleteBilling = async (id) => {
    try {
        return await Billing.destroy({
            where: {
                id,
            },
        });
    } catch (error) {
        throw error;
    }
}
export default {
    insertBilling,
    getBillingById,
    getBillingListByStudentId,
    getBillingList,
    bulkCreateBilling,
    deleteBilling,
    updateBillingById
}