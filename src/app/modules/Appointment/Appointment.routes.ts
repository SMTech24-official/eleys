// Appointment.routes: Module file for the Appointment.routes functionality.
import express from 'express';
import { AppointmentController } from './Appointment.controller';

const router = express.Router();

router.post('/', AppointmentController.createAppointment);
router.get('/', AppointmentController.getAllAppointments);
router.get('/:id', AppointmentController.getAllAppointments);
router.delete('/:id', AppointmentController.getAllAppointments);
// New routes for updating appointment status and isVisited status
router.put('/status/:id', AppointmentController.updateAppointmentStatus); 
router.put('/:id/isVisited', AppointmentController.updateIsVisitedStatus);
export const AppointmentRoutes = router;
