// Service.routes: Module file for the Service.routes functionality.


import express from 'express';
import { ServiceController } from './Service.controller';

const router = express.Router();

// Create a new service
router.post('/', ServiceController.createService);

// Get all services
router.get('/', ServiceController.getAllServices);

// Get a service by ID
router.get('/:id', ServiceController.getServiceById);

// Update a service by ID
router.put('/:id', ServiceController.updateService);

// Delete a service by ID
router.delete('/:id', ServiceController.deleteService);

export const ServiceRoutes = router;
