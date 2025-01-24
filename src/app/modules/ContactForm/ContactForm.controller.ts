import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { ContactUsService } from './ContactForm.service'; // Assuming the service layer is set up correctly

// Send email functionality
const sendEmail = catchAsync(async (req: Request, res: Response) => {
  const result = await ContactUsService.SendEmail(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Email sent successfully',
    data: result,
  });
});

// Get all contact form submissions (if you want to implement it)
const getAllSubmissions = catchAsync(async (req: Request, res: Response) => {
  const submissions = await ContactUsService.GetAllContactForms();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Contact form submissions fetched successfully',
    data: submissions,
  });
});

// Get contact form submission by ID (if needed)
const getSubmissionById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const submission = await ContactUsService.GetContactFormById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Contact form submission fetched successfully',
    data: submission,
  });
});

// Delete contact form submission (if needed)
const deleteSubmission = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ContactUsService.DeleteContactFormById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Contact form submission deleted successfully',
    data: result,
  });
});

export const ContactUsController = {
  sendEmail,
  getAllSubmissions,
  getSubmissionById,
  deleteSubmission,
};
