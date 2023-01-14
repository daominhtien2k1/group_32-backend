import { HttpStatus, RequestStatus, RequestType, UserRole } from "../../constant.js";
import SuccessResponse from "../../utils/SuccessResponse.js";
import requestService from "./services/request.service.js";
import roomService from '../room/services/room.service.js';
import ErrorResponse from "../../utils/ErrorResponse.js";
import userService from "../user/services/user.service.js";
const createRequest = async (req, res) => {
    try {
        if (req.user.roomId && req.body.type === RequestType.ROOM) {
            return res
                .status(HttpStatus.BAD_REQUEST)
                .json(
                    new ErrorResponse(HttpStatus.UNPROCESSABLE_ENTITY, { key: 'roomId', message: "Student already have room" })
                );
        }
        // TODO: remove after fix service getRoomById
        const _ = ''
        const isRoomExisted = await roomService.getRoomById(_, req.body.roomId);
        if (!isRoomExisted) {
            return res
                .status(HttpStatus.BAD_REQUEST)
                .json(
                    new ErrorResponse(HttpStatus.UNPROCESSABLE_ENTITY, { key: 'roomId', message: "Room not exist" })
                );
        }

        const newRequest = await requestService.insertRequest({ ...req.body, studentId: req.user.userId, status: RequestStatus.PENDING });
        return res.status(HttpStatus.OK).json(new SuccessResponse(newRequest));
    } catch (error) {
        return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json(
                new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
            );
    }
}

const getRequestList = async (req, res) => {
    try {
        if (req.user.role == UserRole.STUDENT) {
            const requestList = await requestService.getRequestListByStudentId(req.user.userId);
            return res.status(HttpStatus.OK).json(new SuccessResponse(requestList));
        } else {
            const requestList = await requestService.getAllRequestList();
            return res.status(HttpStatus.OK).json(new SuccessResponse(requestList));
        }
    } catch (error) {
        return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json(
                new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
            );
    }
}

const studentUpdateRequest = async (req, res) => {
    try {
        const isRequestExisted = await requestService.getRequestById(req.params.id);
        if (!isRequestExisted || isRequestExisted.studentId !== req.user.userId) {
            return res
                .status(HttpStatus.BAD_REQUEST)
                .json(
                    new ErrorResponse(HttpStatus.UNPROCESSABLE_ENTITY, { key: 'id', message: "Request not exist" })
                );
        }
        if (isRequestExisted.status !== RequestStatus.PENDING) {
            return res
                .status(HttpStatus.FORBIDDEN)
                .json(
                    new ErrorResponse(HttpStatus.UNPROCESSABLE_ENTITY, { key: 'roomId', message: "Cannot update after reject or accept" })
                );
        }
        // TODO: remove after fix service getRoomById
        const _ = ''
        const isRoomExisted = await roomService.getRoomById(_, req.body.roomId);
        if (!isRoomExisted) {
            return res
                .status(HttpStatus.BAD_REQUEST)
                .json(
                    new ErrorResponse(HttpStatus.UNPROCESSABLE_ENTITY, { key: 'roomId', message: "Room not exist" })
                );
        }
        const updatedRequest = await requestService.updateRequestById(req.params.id, req.body)
        return res.status(HttpStatus.OK).json(new SuccessResponse(updatedRequest));
    } catch (error) {
        return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json(
                new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
            );
    }
}

const updateRequestStatus = async (req, res) => {
    try {
        const isRequestExisted = await requestService.getRequestById(req.params.id);
        if (!isRequestExisted) {
            return res
                .status(HttpStatus.BAD_REQUEST)
                .json(
                    new ErrorResponse(HttpStatus.UNPROCESSABLE_ENTITY, { key: 'id', message: "Request not exist" })
                );
        }
        if (isRequestExisted.status !== RequestStatus.PENDING) {
            return res
                .status(HttpStatus.FORBIDDEN)
                .json(
                    new ErrorResponse(HttpStatus.UNPROCESSABLE_ENTITY, { key: 'status', message: "Cannot change status after reject or accept" })
                );
        }
        const updatedRequest = await requestService.updateRequestById(req.params.id, req.body)
        if (req.body.status === RequestStatus.ACCEPTED) {
            await userService.updateUserById(isRequestExisted.studentId, { roomId: isRequestExisted.roomId })
        }
        return res.status(HttpStatus.OK).json(new SuccessResponse(updatedRequest));
    } catch (error) {
        return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json(
                new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
            );
    }
}

const deleteRequest = async (req, res) => {
    try {
        const isRequestExisted = await requestService.getRequestById(req.params.id);
        if (!isRequestExisted) {
            return res
                .status(HttpStatus.BAD_REQUEST)
                .json(
                    new ErrorResponse(HttpStatus.UNPROCESSABLE_ENTITY, { key: 'id', message: "Request not exist" })
                );
        }
        if (isRequestExisted.status !== RequestStatus.PENDING) {
            return res
                .status(HttpStatus.FORBIDDEN)
                .json(
                    new ErrorResponse(HttpStatus.UNPROCESSABLE_ENTITY, { key: 'id', message: "Cannot delete request after reject or accept" })
                );
        }
        await requestService.softDeleteRequestById(req.params.id);
        return res.status(HttpStatus.OK).json(new SuccessResponse({ id: req.params.id }));
    } catch (error) {
        return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json(
                new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
            );
    }
}

export default {
    createRequest,
    getRequestList,
    updateRequestStatus,
    studentUpdateRequest,
    deleteRequest
}