import contractService from "./services/contract.service.js";
import { HttpStatus, UserRole } from "../../constant.js";
import ErrorResponse from "../../utils/ErrorResponse.js";
import SuccessResponse from "../../utils/SuccessResponse.js";
const updateContract = async (req, res) => {
    try {
        const body = req.body;
        const contractId = req.params.id;
        const updatedContract = await contractService.updateContractById(contractId,
            body)
        return res
            .status(HttpStatus.OK)
            .json(new SuccessResponse(updatedContract));
    } catch (error) {
        return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json(
                new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
            );
    }
}

const updateContractStatus = async (req, res) => {
    try {
        const status = req.body.status;
        const contractId = req.params.id;
        const contract = await contractService.getContractById(contractId);

        const updatedContract = await contractService.updateContractById(contractId,
            { ...contract, status })
        return res
            .status(HttpStatus.OK)
            .json(new SuccessResponse(updatedContract));
    } catch (error) {
        return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json(
                new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
            );
    }
}

const getContractList = async (req, res) => {
    try {
        console.log(req.user.role);
        if (req.user.role == UserRole.STUDENT) {
            const contractList = await contractService.getContractListByStudentId(
                req.user.id
            );
            return res
                .status(HttpStatus.OK)
                .json(new SuccessResponse(contractList));
        } else {
            const contractList = await contractService.getContractList();
            return res
                .status(HttpStatus.OK)
                .json(new SuccessResponse(contractList));
        }
    } catch (error) {
        return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json(
                new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
            );
    }
}

const deleteContract = async (req, res) => {
    try {
        await contractService.deleteContractById(req.params.id);
        return res
            .status(HttpStatus.OK)
            .json(new SuccessResponse({ id: req.params.id }));
    } catch (error) {
        return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json(
                new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, error.message)
            );
    }
}

export default {
    getContractList,
    updateContract,
    deleteContract,
    updateContractStatus,
}