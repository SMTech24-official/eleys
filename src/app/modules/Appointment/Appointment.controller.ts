// Appointment.controller: Module file for the Appointment.controller functionality.

import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { AppointmentService } from './Appointment.service';

// Create a new doctor
const createAppointment = catchAsync(async (req: Request, res: Response) => {
  const result = await AppointmentService.createAppointment(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Appointment created successfully',
    data: result,
  });
});

// Create a new doctor
const getAllAppointments = catchAsync(async (req: Request, res: Response) => {
  const result = await AppointmentService.getAllAppointments();

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

export const AppointmentController = {
  createAppointment,
  getAllAppointments,
  getAllAppointmentsById,
  deleteAppointment,
};
