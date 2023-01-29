import db from "../../../../models/index.cjs";
const RoomCategory = db.roomCategory;

const getRoomCategoryById = async (id) => {
    try {
        return await RoomCategory.findOne({
            where: {
                id,
            }
        })
    } catch (error) {
        throw error;
    }
}
export default { getRoomCategoryById }