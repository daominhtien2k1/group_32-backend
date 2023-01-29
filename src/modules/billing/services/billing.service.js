import db from "../../../../models/index.cjs";
const Billing = db.billing;

const insertBilling = async (insertBody) => {
    try {
        return await Billing.create(insertBody);
    } catch (error) {
        throw error;
    }
}

export default {
    insertBilling,
}