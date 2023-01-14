import db from "../../../../models/index.cjs";
import { softDeleteCondition } from "../../../constant.js";
const Building = db.building;
const Room = db.room;

const buildingAttribute = [
   "id",
   "name",
   "buildingId",
   "capacity",
   "price",
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
const createRoom = async (buildingId, createRoomBody) => {
   try {
      // kiểm tra xem tồn tại tòa nhà không
      const building = await checkBuilldingExist(buildingId);
      createRoomBody.buildingId = buildingId;
      let newRoom = {};
      if (building) {
         // nếu có tòa nah thì tạo mới phòng
         newRoom = await Room.create({
            ...createRoomBody,
         });
      }

      return newRoom;
   } catch (error) {
      //console.log(error);
      throw error;
   }
};

/**
 * trả về thông tin tòa nhà theo id
 * @param {*} id
 * @returns thông tin tòa nhà
 */
const getRoomById = async (buildingId, roomId) => {
   try {
      console.log(roomId);
      const room = await Room.findOne({
         where: {
            id: roomId,
         }
      });
      return room;
   } catch (error) {
      throw error;
   }
};

const getAllRoomsByBuildingId = async (buildingId) => {
   try {
      // kiểm tra xem tồn tại tòa nhà không
      const building = await checkBuilldingExist(buildingId);
      if (building) {
         return await Room.findAll({
            where: {
               buildingId,
            },
         });
      } else return [];
   } catch (error) {
      throw error;
   }
};

/**
 * Cập nhật thông tin tòa nhà
 * @param {*} updateBody
 * @returns thông tin tòa nhà được cập nhật
 */
const updatRoomById = async (buildingId, roomId, updateBody) => {
   try {
      // kiểm tra xem tồn tại tòa nhà không
      const building = await checkBuilldingExist(buildingId);
      updateBody.buildingId = buildingId;
      if (building) {
         return await Room.update(
            { ...updateBody },
            {
               where: {
                  id: roomId,
               },
            }
         );
      } else {
         return -1; // not found building
      }
   } catch (error) {
      throw error;
   }
};

/**
 * xóa mềm 1 tòa nhà theo id
 * @param {*} id
 */
const softDeleteRoomById = async (id) => {
   try {
      await Room.destroy({
         where: {
            id,
         },
      });
      //return 1; // oke
   } catch (error) {
      throw error;
   }
};

const checkBuilldingExist = async (buildingId) => {
   try {
      let building = await Building.findOne({
         where: { id: buildingId },
      });
      return building;
   } catch (error) {
      throw error;
   }
};
const getRoomByFilterAndPaging = async (
   pageSize = 20,
   pageNumber = 1,
   keyword = ""
) => {
   try {
      let totalRecords = 0;
      let includeObj = {
         limit: pageSize - 0,
         offset: (pageNumber - 1) * pageSize,
         raw: true,
      };
      if (keyword && keyword.trim() !== "") {
         includeObj.where = {
            [Op.or]: [
               {
                  name: {
                     [Op.like]: `%${keyword}%`,
                  },
               },
            ],
         };
         totalRecords = await Room.count({
            where: {
               ...includeObj.where,
            },
         });
      } else {
         totalRecords = await Room.count();
      }
      let rooms = await Room.findAll({ ...includeObj });

      return {
         items: rooms,
         totalItems: totalRecords,
         // pageSize,
         // pageNumber,
         // keyword,
      };
   } catch (error) {
      throw error;
   }
};
export default {
   createRoom,
   getRoomById,
   getAllRoomsByBuildingId,
   updatRoomById,
   softDeleteRoomById,
   getRoomByFilterAndPaging,
};
