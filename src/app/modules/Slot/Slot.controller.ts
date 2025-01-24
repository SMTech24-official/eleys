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

export const SlotController = {
  generateSlots,
};
