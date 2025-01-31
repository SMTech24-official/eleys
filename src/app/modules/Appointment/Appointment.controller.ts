// Appointment.controller: Module file for the Appointment.controller functionality.

import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { AppointmentService } from './Appointment.service';
import pick from '../../utils/pick';
import { appointmentFilterableFields, appointmentSearchAbleFields } from './appointment.costant';
import AppError from '../../errors/AppError';

// Create a new doctor
const createAppointment = catchAsync(async (req: Request, res: Response) => {
  const result = await AppointmentService.createAppointment(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Appointment Booked successfully.Check your email',
    data: result,
  });
});

// Create a new doctor
const getAllAppointments = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, appointmentFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await AppointmentService.getAllAppointments(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Appointment retrieve successfully',
    data: result,
  });
});

// Create a new doctor
const getAllAppointmentsById = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AppointmentService.getAllAppointmentsById(
      req.params.id,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Appointment retrieve successfully',
      data: result,
    });
  },
);
// Create a new doctor
const deleteAppointment = catchAsync(async (req: Request, res: Response) => {
  const result = await AppointmentService.deleteAppointment(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Appointment retrieve successfully',
    data: result,
  });
});
// Update appointment status
const updateAppointmentStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params; 
  const { paymentStatus } = req.body;

  if (!paymentStatus) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Status is required');
  }

  const result = await AppointmentService.updateAppointmentStatus(id, paymentStatus);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Appointment status updated successfully',
    data: result,
  });
});

// Update isVisited status of appointment
const updateIsVisitedStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { isVisited } = req.body; 

  if (typeof isVisited === 'undefined') {
    throw new AppError(httpStatus.BAD_REQUEST, 'isVisited status is required');
  }

  const result = await AppointmentService.updateIsVisitedStatus(id, isVisited);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Appointment visited status updated successfully',
    data: result,
  });
});
export const AppointmentController = {
  createAppointment,
  getAllAppointments,
  getAllAppointmentsById,
  deleteAppointment,
  updateAppointmentStatus,
  updateIsVisitedStatus
};
