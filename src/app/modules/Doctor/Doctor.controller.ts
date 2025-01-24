// Doctor.controller: Module file for the Doctor.controller functionality.
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { DoctorService } from './Doctor.service';

// Create a new doctor
const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await DoctorService.createDoctor(req);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Doctor created successfully',
    data: result,
  });
});

// Get all doctors
const getAllDoctors = catchAsync(async (req: Request, res: Response) => {
  const result = await DoctorService.getAllDoctors();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Doctors fetched successfully',
    data: result,
  });
});

// Get a doctor by ID
const getDoctorById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await DoctorService.getDoctorById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Doctor fetched successfully',
    data: result,
  });
});

// Update doctor details
const updateDoctor = catchAsync(async (req: Request, res: Response) => {

  const result = await DoctorService.updateDoctor(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Doctor updated successfully',
    data: result,
  });
});

// Delete a doctor by ID
const deleteDoctor = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await DoctorService.deleteDoctor(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Doctor deleted successfully',
    data: result,
  });
});

export const DoctorController = {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
