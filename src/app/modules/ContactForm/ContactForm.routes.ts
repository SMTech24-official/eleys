import express from 'express';
import { ContactUsController } from './ContactForm.controller';

const router = express.Router();

// Route to send email when contact form is submitted
router.post('/', ContactUsController.sendEmail);

// Route to get all contact form submissions (for admin use, optional)
router.get('/', ContactUsController.getAllSubmissions);

// Route to get a specific contact form submission by ID
router.get('/:id', ContactUsController.getSubmissionById);

// Route to delete a specific contact form submission by ID (optional, for admin)
router.delete('/:id', ContactUsController.deleteSubmission);

export const ContactRoutes = router;
