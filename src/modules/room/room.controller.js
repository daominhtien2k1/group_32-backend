import { HttpStatus } from "../../constant.js";
import * as roomService from "./services/room.service.js";
import ErrorResponse from "../../utils/ErrorResponse.js";
import SuccessResponse from "../../utils/SuccessResponse.js";

/**
 * Trả về phòng theo id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * return: thông tin phòng
 */
const getRoomById = async (req, res, next) => {
   try {
      const room = await roomService.getRoomById(
         req.params.buildingId,
         req.params.roomId
      );
      if (room) {
         res.status(HttpStatus.OK).send(new SuccessResponse(room));
      } else {
         res.status(HttpStatus.NOT_FOUND).json(
            new ErrorResponse(HttpStatus.BAD_REQUEST, "Not found room")
         );
      }
   } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
         new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
      );
   }
};

/**
 * Tạo mới 1 phòng
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * return: id của phòng vừa tạo
 */
const createRoom = async (req, res) => {
   try {
      const newRoom = await roomService.createRoom(
         req.params.buildingId,
         req.body
      );
      if (newRoom) {
         res.status(HttpStatus.OK).send(new SuccessResponse(newRoom.id));
      } else {
         res.status(HttpStatus.NOT_FOUND).json(
            new ErrorResponse(
               HttpStatus.BAD_REQUEST,
               "Not found building to create room"
            )
         );
      }
   } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
         new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
      );
   }
};

/**
 * Cập nhật thông tin 1 phòng
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * return: id phòng
 */
const updateRoom = async (req, res, next) => {
   try {
      const rowAffect = await roomService.updatRoomById(
         req.params.buildingId,
         req.params.roomId,
         req.body
      );
      if (rowAffect > 0) {
         res.status(HttpStatus.OK).send(new SuccessResponse(room.id));
      } else if (rowAffect < 0) {
         res.status(HttpStatus.NOT_FOUND).json(
            new ErrorResponse(
               HttpStatus.BAD_REQUEST,
               "Not found building to update"
            )
         );
      } else {
         res.status(HttpStatus.BAD_REQUEST).json(
            new ErrorResponse(HttpStatus.BAD_REQUEST, "update faile")
         );
      }
   } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
         new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
      );
   }
};

/**
 * xóa thông tin 1 phòng
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * return: id phòng
 */
const softDeleteRoomgById = async (req, res, next) => {
   try {
      await roomService.softDeleteRoomById(req.params.roomId);
      res.status(HttpStatus.OK).send(new SuccessResponse(req.params.roomId));
   } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
         new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
      );
   }
};

const getAllRoomsByBuildingId = async (req, res, next) => {
   try {
      let rooms = await roomService.getAllRoomsByBuildingId(
         req.params.buildingId
      );
      if (!rooms) rooms = [];
      res.status(HttpStatus.OK).send(new SuccessResponse(rooms));
   } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
         new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
      );
   }
};
const getRoomByFilterAndPaging = async (req, res, next) => {
   try {
      let { pageSize, pageNumber, keyword } = req.query;
      let rooms = await roomService.getRoomByFilterAndPaging(
         pageSize,
         pageNumber,
         keyword
      );
      return res.status(HttpStatus.OK).json(new SuccessResponse(rooms));
   } catch (error) {
      return res
         .status(HttpStatus.INTERNAL_SERVER_ERROR)
         .json(
            new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
         );
   }
};
export {
   getRoomById,
   createRoom,
   updateRoom,
   softDeleteRoomgById,
   getAllRoomsByBuildingId,
   getRoomByFilterAndPaging,
};
