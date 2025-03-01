import express from 'express';

import { ReviewRoutes } from '../modules/Review/Review.routes';
import { ContactRoutes } from '../modules/ContactForm/ContactForm.routes';
import { DoctorRoutes } from '../modules/Doctor/Doctor.routes';
import { ServiceRoutes } from '../modules/Service/Service.routes';
import { SlotRoutes } from '../modules/Slot/Slot.routes';
import { AppointmentRoutes } from '../modules/Appointment/Appointment.routes';
import { AuthRouters } from '../modules/Auth/auth.routes';
import { UserRouters } from '../modules/User/user.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRouters,
  },
  {
    path: '/users',
    route: UserRouters,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
  {
    path: '/contact-us',
    route: ContactRoutes,
  },
  {
    path: '/doctors',
    route: DoctorRoutes,
  },
  {
    path: '/service',
    route: ServiceRoutes,
  },
  {
    path: '/slot',
    route: SlotRoutes,
  },
  {
    path: '/appointment',
    route: AppointmentRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
