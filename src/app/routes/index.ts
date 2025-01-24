import express from 'express';
import { AuthRouters } from '../modules/Auth/auth.routes';
import { UserRouters } from '../modules/User/user.routes';
import { ReviewRoutes } from '../modules/Review/Review.routes';
import { ContactRoutes } from '../modules/ContactForm/ContactForm.routes';
import { DoctorRoutes } from '../modules/Doctor/Doctor.routes';
const router = express.Router();

const moduleRoutes = [
  // {
  //   path: '/auth',
  //   route: AuthRouters,
  // },
  // {
  //   path: '/users',
  //   route: UserRouters,
  // },
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
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
