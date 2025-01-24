import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import prisma from '../../utils/prisma';
import emailSender from '../../utils/emailSernder';
import emailTemplate from '../../utils/emailTemplet';


// Send email and save contact form data to the database
const SendEmail = async (payload: any) => {
  if (!payload.email) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Please provide a valid email address');
  }

  // Send email using emailSender utility
  await emailSender(
    'Thank You for Contacting Us',
    payload.email,
    emailTemplate(payload)
  );

  // Save contact form submission to the database
  const result = await prisma.contactForm.create({
    data: payload,
  });

  return result;
};

// Get all contact form submissions
const GetAllContactForms = async () => {
  const contactForms = await prisma.contactForm.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return contactForms;
};

// Get a specific contact form submission by ID
const GetContactFormById = async (id: string) => {
  const contactForm = await prisma.contactForm.findUnique({
    where: { id },
  });

  if (!contactForm) {
    throw new AppError(httpStatus.NOT_FOUND, 'Contact form not found');
  }

  return contactForm;
};

// Update a contact form submission by ID
const UpdateContactFormById = async (id: string, payload: any) => {
  const contactForm = await prisma.contactForm.findUnique({
    where: { id },
  });

  if (!contactForm) {
    throw new AppError(httpStatus.NOT_FOUND, 'Contact form not found');
  }

  const updatedContactForm = await prisma.contactForm.update({
    where: { id },
    data: payload,
  });

  return updatedContactForm;
};

// Delete a contact form submission by ID
const DeleteContactFormById = async (id: string) => {
  const contactForm = await prisma.contactForm.findUnique({
    where: { id },
  });

  if (!contactForm) {
    throw new AppError(httpStatus.NOT_FOUND, 'Contact form not found');
  }

  await prisma.contactForm.delete({
    where: { id },
  });

  return { message: 'Contact form deleted successfully' };
};

export const ContactUsService = {
  SendEmail,
  GetAllContactForms,
  GetContactFormById,
  UpdateContactFormById,
  DeleteContactFormById,
};
