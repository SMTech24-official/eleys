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
// Get all slots
const getAllSlots = catchAsync(async (req, res) => {
  const result = await SlotService.getAllSlots();

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
