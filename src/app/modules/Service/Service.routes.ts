// Service.routes: Module file for the Service.routes functionality.


import express from 'express';
import { ServiceController } from './Service.controller';
import { fileUploader } from '../../utils/fileUploader';

const router = express.Router();

// Get a service by doctor ID
router.get('/doctor/:doctorId', ServiceController.getServiceByDoctorId);

// Create a new service
router.post('/',fileUploader.uploadInstituteFile, ServiceController.createService);

// Get all services
router.get('/', ServiceController.getAllServices);

// Get a service by ID
router.get('/:id', ServiceController.getServiceById);



// Update a service by ID
router.put('/:id',fileUploader.uploadInstituteFile, ServiceController.updateService);

// Delete a service by ID
router.delete('/:id', ServiceController.deleteService);

export const ServiceRoutes = router;
