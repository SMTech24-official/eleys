"use strict";
// Service.controller: Module file for the Service.controller functionality.
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
exports.ServiceController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const Service_service_1 = require("./Service.service");
// Create a new service
const createService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Service_service_1.ServiceService.createService(req);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        message: 'Service created successfully',
        data: result,
    });
}));
// Get all services
const getAllServices = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Service_service_1.ServiceService.getAllServices();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Services fetched successfully',
        data: result,
    });
}));
// Get a service by ID
const getServiceById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield Service_service_1.ServiceService.getServiceById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Service fetched successfully',
        data: result,
    });
}));
// Get a service by ID
const getServiceByDoctorId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { doctorId } = req.params;
    const result = yield Service_service_1.ServiceService.getServiceByDoctorId(doctorId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Service fetched successfully',
        data: result,
    });
}));
// Update a service by ID
const updateService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield Service_service_1.ServiceService.updateService(id, req);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Service updated successfully',
        data: result,
    });
}));
// Delete a service by ID
const deleteService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield Service_service_1.ServiceService.deleteService(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Service deleted successfully',
        data: result,
    });
}));
exports.ServiceController = {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService,
    getServiceByDoctorId
};
