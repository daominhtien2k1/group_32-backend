import db from "../../../../models/index.cjs";
import { softDeleteCondition } from "../../../constant.js";
import Sequelize from "sequelize";
const Op = Sequelize.Op;
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
      createRoomBody.buildingId = buildingId;
      let newRoom = {};
      return await Room.create({
         ...createRoomBody,
      });
   } catch (error) {
      throw error;
   }
};

/**
 * trả về thông tin tòa nhà theo id
 * @param {*} id
 * @returns thông tin tòa nhà
 */
const getRoomById = async (roomId) => {
   try {
      return await Room.findOne({
         where: {
            id: roomId,
         },
      });
   } catch (error) {
      throw error;
   }
};

const getAllRoomsByBuildingId = async (buildingId) => {
   try {
      return await Room.findAll({
         where: {
            buildingId,
         },
      });
   } catch (error) {
      throw error;
   }
};

/**
 * Cập nhật thông tin tòa nhà
 * @param {*} updateBody
 * @returns thông tin tòa nhà được cập nhật
 */
const updateRoomById = async (buildingId, roomId, updateBody) => {
   try {
      updateBody.buildingId = buildingId;
      return await Room.update(
         { ...updateBody },
         {
            where: {
               id: roomId,
            },
         }
      );
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

const getListRoom = async (query) => {
   try {
      const { page = 1, limit = 10, keyword = "", buildingId } = query;
      let dbQuery = {};
      if (keyword) {
         dbQuery = {
            ...dbQuery,
            [Op.or]: [
               {
                  name: {
                     [Op.like]: `%${keyword}%`,
                  },
               },
               {
                  capacity: {
                     [Op.like]: `%${keyword}%`,
                  },
               },
               {
                  price: {
                     [Op.like]: `%${keyword}%`,
                  },
               },
            ],
         };
      }
      if (buildingId) {
         dbQuery = {
            ...dbQuery,
            [Op.or]: [
               {
                  buildingId: {
                     [Op.like]: `%${buildingId}%`,
                  },
               },
            ],
         };
      }

      const data = await Room.findAndCountAll({
         limit: +limit || 1,
         offset: +limit * (+page - 1),
         order: [["createdAt", "DESC"]],
         where: dbQuery,
      });
      return { items: data.rows, totalItems: data.count };
   } catch (error) {
      throw error;
   }
};
export {
   createRoom,
   getRoomById,
   getAllRoomsByBuildingId,
   updateRoomById,
   softDeleteRoomById,
   getListRoom,
};
