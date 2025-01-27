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
exports.ServiceService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
// Service.service: Module file for the Service functionality.
// Create a new service
const createService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload.name ||
        !payload.specialization ||
        !payload.price ||
        !payload.duration ||
        !payload.doctorId) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Please provide all the required fields');
    }
    const existingService = yield prisma_1.default.service.findFirst({
        where: { name: payload.name, specialization: payload.specialization },
    });
    if (existingService) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Service already exists');
    }
    const isDoctorExist = yield prisma_1.default.doctor.findUnique({
        where: { id: payload.doctorId },
    });
    if (!isDoctorExist) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Doctor does not exist');
    }
    const service = yield prisma_1.default.service.create({
        data: payload,
    });
    return service;
});
// Get all services
const getAllServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const services = yield prisma_1.default.service.findMany({
        include: {
            slots: true,
        },
        orderBy: { createdAt: 'desc' },
    });
    return services;
});
// Get service by ID
const getServiceById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield prisma_1.default.service.findUnique({
        where: { id },
    });
    if (!service) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Service not found');
    }
    return service;
});
// Update a service by ID
const updateService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingService = yield prisma_1.default.service.findUnique({
        where: { id },
    });
    if (!existingService) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Service not found');
    }
    const updatedService = yield prisma_1.default.service.update({
        where: { id },
        data: payload,
    });
    return updatedService;
});
const getServiceByDoctorId = (doctorId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(doctorId);
    if (!doctorId) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Doctor ID is required');
    }
    if (!/^[0-9a-fA-F]{24}$/.test(doctorId)) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid doctor ID');
    }
    const isDoctorExist = yield prisma_1.default.doctor.findFirst({
        where: { id: doctorId },
    });
    if (!isDoctorExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Doctor not found');
    }
    const services = yield prisma_1.default.service.findMany({
        include: {
            slots: true,
        },
        where: { doctorId },
    });
    return services;
});
// Delete a service by ID
const deleteService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield prisma_1.default.service.findUnique({
        where: { id },
    });
    if (!service) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Service not found');
    }
    yield prisma_1.default.service.delete({
        where: { id },
    });
    return { message: 'Service deleted successfully' };
});
exports.ServiceService = {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService,
    getServiceByDoctorId,
};
