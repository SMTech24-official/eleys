"use strict";
// Service.routes: Module file for the Service.routes functionality.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const Service_controller_1 = require("./Service.controller");
const router = express_1.default.Router();
// Get a service by doctor ID
router.get('/doctor/:doctorId', Service_controller_1.ServiceController.getServiceByDoctorId);
// Create a new service
router.post('/', Service_controller_1.ServiceController.createService);
// Get all services
router.get('/', Service_controller_1.ServiceController.getAllServices);
// Get a service by ID
router.get('/:id', Service_controller_1.ServiceController.getServiceById);
// Update a service by ID
router.put('/:id', Service_controller_1.ServiceController.updateService);
// Delete a service by ID
router.delete('/:id', Service_controller_1.ServiceController.deleteService);
exports.ServiceRoutes = router;
