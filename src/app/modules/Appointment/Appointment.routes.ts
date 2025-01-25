// Appointment.routes: Module file for the Appointment.routes functionality.
import express from 'express';
import { AppointmentController } from './Appointment.controller';

const router = express.Router();

router.post('/', AppointmentController.createAppointment);
router.get('/', AppointmentController.getAllAppointments);
router.get('/:id', AppointmentController.getAllAppointments);
router.delete('/:id', AppointmentController.getAllAppointments);

export const AppointmentRoutes = router;
