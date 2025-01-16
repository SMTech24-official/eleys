"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const Provider_service_1 = require("./Provider.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const pickValidFields_1 = __importDefault(require("../../utils/pickValidFields"));
// create a driver
const createProvider = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const driverData = req.body || {};
    const result = yield Provider_service_1.ProviderService.createProvider(driverData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'provider created successfully',
        data: result,
    });
}));
// get a driver
const getProvider = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield Provider_service_1.ProviderService.getProvider(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'provider fetched successfully',
        data: result,
    });
}));
// get all drivers
const getAllProvider = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const options = (0, pickValidFields_1.default)(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
    const params = (0, pickValidFields_1.default)(req.query, ['searchTerm', "email", "name"]);
    const result = yield Provider_service_1.ProviderService.getAllProvider(options, params);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'providers fetched successfully',
        data: result,
    });
}));
// update a driver
const updateProvider = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const driverData = req.body || {};
    const result = yield Provider_service_1.ProviderService.updateProvider(id, driverData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'provider updated successfully',
        data: result,
    });
}));
const deleteProvider = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield Provider_service_1.ProviderService.deleteProvider(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'provider deleted successfully',
        data: result,
    });
}));
const ProviderController = {
    createProvider,
    getProvider,
    getAllProvider,
    updateProvider,
    deleteProvider,
};
