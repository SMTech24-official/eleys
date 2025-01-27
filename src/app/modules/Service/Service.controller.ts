// Service.controller: Module file for the Service.controller functionality.

import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { ServiceService } from './Service.service';

// Create a new service
const createService = catchAsync(async (req, res) => {
  const result = await ServiceService.createService(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Service created successfully',
    data: result,
  });
});

// Get all services
const getAllServices = catchAsync(async (req, res) => {
  const result = await ServiceService.getAllServices();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Services fetched successfully',
    data: result,
  });
});

// Get a service by ID
const getServiceById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceService.getServiceById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Service fetched successfully',
    data: result,
  });
});
// Get a service by ID
const getServiceByDoctorId = catchAsync(async (req, res) => {
  const { doctorId } = req.params;

  const result = await ServiceService.getServiceByDoctorId(doctorId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Service fetched successfully',
    data: result,
  });
});

// Update a service by ID
const updateService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceService.updateService(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Service updated successfully',
    data: result,
  });
});

// Delete a service by ID
const deleteService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceService.deleteService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Service deleted successfully',
    data: result,
  });
});

export const ServiceController = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
  getServiceByDoctorId
};
