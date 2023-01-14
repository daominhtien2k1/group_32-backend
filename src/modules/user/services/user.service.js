import db from "../../../../models/index.cjs";
import { softDeleteCondition } from "../../../constant.js";
import { UserRole } from "../../../constant.js";
import Sequelize from "sequelize";
const Op = Sequelize.Op;
const User = db.user;

const userAttribute = [
   "id",
   "name",
   "email",
   "role",
   "status",
   "createdAt",
   "updatedAt",
   "deletedAt",
];

const createUser = async (createUserBody) => {
   try {
      const newUser = await User.create(createUserBody);
      delete newUser.password;
      return newUser;
   } catch (error) {
      throw error;
   }
};

const getUserById = async (id) => {
   try {
      return await User.findOne({
         where: {
            id,
         },
      });
   } catch (error) {
      throw error;
   }
};

const getUserByEmail = async (email) => {
   try {
      return await User.findOne({
         where: {
            email,
         },
      });
   } catch (error) {
      throw error;
   }
};

const updateUserById = async (id, updateBody) => {
   try {
      return await User.update(updateBody, {
         where: {
            id,
         },
      });
   } catch (error) {
      throw error;
   }
};
// đếm số lượng tài khoản sinh viên
const countStudent = async () => {
   try {
      return await User.count({
         where: {
            role: UserRole.STUDENT,
         },
      });
   } catch (error) {
      throw error;
   }
};
const countAdmin = async () => {
   try {
      return await User.count({
         where: {
            role: UserRole.ADMIN,
         },
      });
   } catch (error) {
      throw error;
   }
};
const getAmin = async (pageSize = 20, pageNumber = 1, keyword, name, email) => {
   try {
      let totalRecords = 0;
      let includeObj = {
         limit: pageSize - 0,
         offset: (pageNumber - 1) * pageSize,
         raw: true,
      };
      includeObj.where = {
         role: UserRole.ADMIN,
      };
      if (keyword && keyword.trim() !== "") {
         includeObj.where = {
            ...includeObj.where,
            [Op.or]: [
               {
                  name: {
                     [Op.like]: `%${keyword}%`,
                  },
               },
               {
                  email: {
                     [Op.like]: `%${keyword}%`,
                  },
               },
            ],
         };
      }
      totalRecords = await User.count({
         where: {
            ...includeObj.where,
         },
      });

      // sort

      includeObj.order = [];
      if (name) {
         if (name == "1") includeObj.order.push(["name", "asc"]);
         else includeObj.order.push(["name", "desc"]);
      }
      if (email) {
         if (email == "1") includeObj.order.push(["email", "asc"]);
         else includeObj.order.push(["email", "desc"]);
      }

      // attributes
      includeObj.attributes = {
         exclude: ["password"],
      };
      let users = await User.findAll({ ...includeObj });

      return {
         items: users,
         totalItems: totalRecords,
      };
   } catch (error) {
      throw error;
   }
};

// danh sach student theo roomId
// chưa làm , thiếu table liên kết giữa user và room
const getStudentByRoomId = async (
   roomId,
   pageSize = 20,
   pageNumber = 1,
   keyword,
   name,
   email
) => {
   try {
      let totalRecords = 0;
      let includeObj = {
         limit: pageSize - 0,
         offset: (pageNumber - 1) * pageSize,
         raw: true,
      };
      includeObj.where = {
         role: UserRole.STUDENT,
      };
      if (keyword && keyword.trim() !== "") {
         includeObj.where = {
            ...includeObj.where,
            [Op.or]: [
               {
                  name: {
                     [Op.like]: `%${keyword}%`,
                  },
               },
               {
                  email: {
                     [Op.like]: `%${keyword}%`,
                  },
               },
            ],
         };
      }
      totalRecords = await User.count({
         where: {
            ...includeObj.where,
         },
      });

      // sort

      includeObj.order = [];
      if (name) {
         if (name == "1") includeObj.order.push(["name", "asc"]);
         else includeObj.order.push(["name", "desc"]);
      }
      if (email) {
         if (email == "1") includeObj.order.push(["email", "asc"]);
         else includeObj.order.push(["email", "desc"]);
      }

      // attributes
      includeObj.attributes = {
         exclude: ["password"],
      };
      let users = await User.findAll({ ...includeObj });

      return {
         items: users,
         totalItems: totalRecords,
      };
   } catch (error) {
      throw error;
   }
};
export default {
   createUser,
   getUserById,
   getUserByEmail,
   updateUserById,
   countStudent,
   countAdmin,
   getAmin,
   getStudentByRoomId,
};
