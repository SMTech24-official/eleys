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
const fileUploadAws_1 = require("../../utils/fileUploadAws");
// Service.service: Module file for the Service functionality.
// Create a new service
const createService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    let payload = {};
    try {
        payload = JSON.parse(req.body.data);
    }
    catch (error) {
        console.error('Error parsing JSON:', error);
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Invalid JSON data Error parsing JSON');
    }
    const isDoctorExist = yield prisma_1.default.doctor.findUnique({
        where: { id: payload.doctorId },
    });
    if (!isDoctorExist) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Doctor does not exist');
    }
    const existingService = yield prisma_1.default.service.findFirst({
        where: { name: payload.name, specialization: payload.specialization },
    });
    if (existingService) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Service already exists');
    }
    if (!payload.name ||
        !payload.specialization ||
        !payload.price ||
        !payload.duration ||
        !payload.doctorId) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Please provide all the required fields');
    }
    const images = req.files;
    let galleryImages;
    if (Array.isArray(images)) {
        galleryImages = images;
    }
    else if (images && 'galleryImages' in images) {
        galleryImages = images.galleryImages;
    }
    else {
        galleryImages = [];
    }
    payload.galleryImages = yield Promise.all(galleryImages.map((image) => __awaiter(void 0, void 0, void 0, function* () {
        if (Array.isArray(image)) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid image format');
        }
        return {
            url: (yield (0, fileUploadAws_1.uploadToDigitalOceanAWS)(image)).Location,
        };
    })));
    let thumbImage;
    if (images && !Array.isArray(images) && 'thumbImage' in images) {
        thumbImage = Array.isArray(images.thumbImage)
            ? images.thumbImage[0]
            : images.thumbImage;
    }
    //uploadToDigital
    if (thumbImage) {
        payload.thumbImage = (yield (0, fileUploadAws_1.uploadToDigitalOceanAWS)(thumbImage)).Location;
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
const updateService = (id, req) => __awaiter(void 0, void 0, void 0, function* () {
    let payload = {};
    // Parse the incoming JSON data
    try {
        payload = JSON.parse(req.body.data);
    }
    catch (error) {
        console.error('Error parsing JSON:', error);
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Invalid JSON data. Error parsing JSON.');
    }
    // Check if the service exists
    const existingService = yield prisma_1.default.service.findUnique({
        where: { id },
    });
    if (!existingService) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Service not found');
    }
    // If doctorId is provided, verify if the doctor exists
    if (payload.doctorId) {
        const isDoctorExist = yield prisma_1.default.doctor.findUnique({
            where: { id: payload.doctorId },
        });
        if (!isDoctorExist) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Doctor does not exist');
        }
    }
    // Handle images if provided
    const images = req.files;
    let galleryImages = [];
    if (Array.isArray(images)) {
        galleryImages = images;
    }
    else if (images && 'galleryImages' in images) {
        galleryImages = images.galleryImages;
    }
    if (galleryImages.length) {
        payload.galleryImages = yield Promise.all(galleryImages.map((image) => __awaiter(void 0, void 0, void 0, function* () {
            if (Array.isArray(image)) {
                throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid image format');
            }
            return {
                url: (yield (0, fileUploadAws_1.uploadToDigitalOceanAWS)(image)).Location,
            };
        })));
    }
    let thumbImage;
    if (images && !Array.isArray(images) && 'thumbImage' in images) {
        thumbImage = Array.isArray(images.thumbImage)
            ? images.thumbImage[0]
            : images.thumbImage;
    }
    if (thumbImage) {
        payload.thumbImage = (yield (0, fileUploadAws_1.uploadToDigitalOceanAWS)(thumbImage)).Location;
    }
    // Update the service with new data
    const updatedService = yield prisma_1.default.service.update({
        where: { id },
        data: payload,
    });
    return updatedService;
});
const getServiceByDoctorId = (doctorId) => __awaiter(void 0, void 0, void 0, function* () {
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
        where: { doctorId },
        include: {
            slots: {
                where: {
                    isAvailable: true,
                    isBooked: false,
                },
            },
        },
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
