import db from "../../../../models/index.cjs";
import { softDeleteCondition } from "../../../constant.js";
const Building = db.building;

const buildingAttribute = [
   "id",
   "name",
   "address",
   "createdAt",
   "updatedAt",
   "deletedAt",
];

/**
 * Tạo mới tòa nhà
 * @param {*} createBuildingBody
 * @returns thông tin tòa nhà vừa tạo
 * Author: VDTIEN(23/11/2022)
 */
const createBuilding = async (createBuildingBody) => {
   try {
      const newBuilding = await Building.create({
         ...createBuildingBody,
      });
      return newBuilding;
   } catch (error) {
      console.log(error);
      throw error;
   }
};

/**
 * trả về thông tin tòa nhà theo id
 * @param {*} id
 * @returns thông tin tòa nhà
 */
const getBuildingById = async (id) => {
   try {
      return await Building.findOne({
         where: {
            id,
         },
      });
   } catch (error) {
      throw error;
   }
};

const getAllBuildings = async () => {
   try {
      return await Building.findAll({});
   } catch (error) {
      throw error;
   }
};

/**
 * Cập nhật thông tin tòa nhà
 * @param {*} updateBody
 * @returns thông tin tòa nhà được cập nhật
 */
const updateBuildingById = async (buildingId, updateBody) => {
   try {
      return await Building.update(
         { ...updateBody },
         {
            where: {
               id: buildingId,
            },
         }
      );
   } catch (error) {
      throw error;
   }
};

// const getBuildingsByPaging = async (updateBody) => {
//    try {
//       return await Building.update(updateBody, {
//          where: {
//             id: updateBody.buildingId,
//          },
//       });
//    } catch (error) {
//       throw error;
//    }
// };

/**
 * xóa mềm 1 tòa nhà theo id
 * @param {*} id
 */
const softDeleteBuildingById = async (id) => {
   try {
      await Building.destroy({
         where: {
            id,
         },
      });
      //return 1; // oke
   } catch (error) {
      throw error;
   }
};

export {
   createBuilding,
   getBuildingById,
   updateBuildingById,
   softDeleteBuildingById,
   getAllBuildings,
};
