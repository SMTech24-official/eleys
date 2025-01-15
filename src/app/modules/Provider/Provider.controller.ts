import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { ProviderService } from "./Provider.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import pickValidFields from "../../utils/pickValidFields";

// create a driver
const createProvider = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const driverData = req.body || {};
        const result = await ProviderService.createProvider(driverData);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'provider created successfully',
            data: result,
        });
    }
)


// get a driver
const getProvider = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const result = await ProviderService.getProvider(id);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'provider fetched successfully',
            data: result,
        });
    }
)


// get all drivers
const getAllProvider = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const options =  pickValidFields(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
        const params = pickValidFields(req.query, ['searchTerm', "email", "name"]);
        const result = await ProviderService.getAllProvider(options, params); 
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'providers fetched successfully',
            data: result,
        });
    }
)

// update a driver
const updateProvider = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const driverData = req.body || {};
        const result = await ProviderService.updateProvider(id, driverData);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'provider updated successfully',
            data: result,
        });
    }
)

const deleteProvider = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const result = await ProviderService.deleteProvider(id);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'provider deleted successfully',
            data: result,
        });
    }
)


const ProviderController = {
    createProvider,
    getProvider,
    getAllProvider,
    updateProvider,
    deleteProvider,
};


