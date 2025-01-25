// Slot.controller: Module file for the Slot.controller functionality.

import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SlotService } from './Slot.service';

// Create a new service
const generateSlots = catchAsync(async (req, res) => {
  const result = await SlotService.generateSlots(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Slot created successfully',
    data: result,
  });
});
// Get all slots with pagination and filtering
const getAllSlots = catchAsync(async (req, res) => {
  // Extract query parameters from the request
  const { page = 1, limit = 7, startDate, endDate } = req.query;

  // Convert the query parameters into the appropriate types (for startDate and endDate)
  const startDateParsed = startDate ? new Date(startDate as string) : undefined;
  const endDateParsed = endDate ? new Date(endDate as string) : undefined;

  // Call the service method with pagination and filtering parameters
  const result = await SlotService.getAllSlots(
    parseInt(page as string, 10),  // Convert page to an integer
    parseInt(limit as string, 10), // Convert limit to an integer
    startDateParsed,     // Pass the parsed startDate
    endDateParsed        // Pass the parsed endDate
  );

  // Send the response back to the client
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Slots fetched successfully',
    data: result,
  });
});

// Get schedule by service id
const getScheduleByServiceId = catchAsync(async (req, res) => {
  const result = await SlotService.getScheduleByServiceId(req.params.serviceId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Schedule fetched successfully',
    data: result,
  });
});

// Get slot by id
const getSlotById = catchAsync(async (req, res) => {
  const result = await SlotService.getSlotById(req.params.slotId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Slot fetched successfully',
    data: result,
  });
});

// Update a slot
const updateSlot = catchAsync(async (req, res) => {
  const result = await SlotService.updateSlot(req.params.slotId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Slot updated successfully',
    data: result,
  });
});

// Delete a slot by id
const deleteSlot = catchAsync(async (req, res) => {
  await SlotService.deleteSlot(req.params.slotId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Slot deleted successfully',
    data: null,
  });
});

export const SlotController = {
  generateSlots,
  getAllSlots,
  getScheduleByServiceId,
  getSlotById,
  updateSlot,
  deleteSlot,
};
