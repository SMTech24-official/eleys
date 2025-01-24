// Doctor.routes: Module file for the Doctor.routes functionality.
import express from 'express';
import { DoctorController } from './Doctor.controller';
import { fileUploader } from '../../utils/fileUploader';

const router = express.Router();

// Create a new doctor
router.post('/', fileUploader.uploadSingle, DoctorController.createDoctor);

// Get all doctors
router.get('/', DoctorController.getAllDoctors);

// Get doctor by ID
router.get('/:id', DoctorController.getDoctorById);

// Update doctor by ID
router.put('/:id', fileUploader.uploadSingle, DoctorController.updateDoctor);

// Delete doctor by ID
router.delete('/:id', DoctorController.deleteDoctor);

export const DoctorRoutes = router;
