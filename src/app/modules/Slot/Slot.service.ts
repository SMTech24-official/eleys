import prisma from '../../utils/prisma';
import { addHours, addMinutes, format } from 'date-fns';
import { ObjectId } from 'mongodb';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const generateSlots = async (payload: any) => {
  const { startDate, endDate, startTime, endTime, serviceId } = payload;

  // Validate if the serviceId is a valid MongoDB ObjectId
  if (!ObjectId.isValid(serviceId)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid serviceId format');
  }
  const isServiceExist = await prisma.service.findUnique({
    where: {
      id: serviceId,
    },
  });
  if (!isServiceExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Service not found');
  }
  const intervalTime = 30; // 30-minute intervals

  const schedules: any[] = [];

  const currentDate = new Date(startDate); // Start date
  const lastDate = new Date(endDate); // End date

  // Loop through the date range from startDate to endDate
  while (currentDate <= lastDate) {
    // Set the start time for the day (e.g., 08:00 AM)
    const startDateTime = new Date(
      addMinutes(
        addHours(
          `${format(currentDate, 'yyyy-MM-dd')}`,
          Number(startTime.split(':')[0]), // Hours part of the start time
        ),
        Number(startTime.split(':')[1]), // Minutes part of the start time
      ),
    );

    // Set the end time for the day (e.g., 10:00 AM)
    const endDateTime = new Date(
      addMinutes(
        addHours(
          `${format(currentDate, 'yyyy-MM-dd')}`,
          Number(endTime.split(':')[0]), // Hours part of the end time
        ),
        Number(endTime.split(':')[1]), // Minutes part of the end time
      ),
    );

    // Loop through the time range for each day and generate slots
    while (startDateTime < endDateTime) {
      const s = startDateTime; // Current slot start time
      const e = addMinutes(startDateTime, intervalTime); // Current slot end time

      const scheduleData = {
        serviceId: serviceId,
        startDateTime: s,
        endDateTime: e,
        duration: intervalTime,
      };

      // Check if the schedule already exists in the database
      const existingSchedule = await prisma.slot.findFirst({
        where: {
          startDateTime: scheduleData.startDateTime,
          endDateTime: scheduleData.endDateTime,
        },
      });

      // If no existing schedule, create a new schedule
      if (!existingSchedule) {
        const result = await prisma.slot.create({
          data: scheduleData,
        });
        schedules.push(result);
      }

      // Move to the next slot (increment by intervalTime)
      startDateTime.setMinutes(startDateTime.getMinutes() + intervalTime);
    }

    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return schedules;
};

const getAllSlots = async () => {
  const schedules = await prisma.slot.findMany();
  return schedules;
};

const getScheduleByServiceId = async (serviceId: string) => {
  const schedules = await prisma.slot.findMany({
    where: {
      serviceId: serviceId,
    },
  });
  return schedules;
};

const getSlotById = async (slotId: string) => {
  console.log(slotId);
  const schedule = await prisma.slot.findUnique({
    where: {
      id: slotId,
    },
  });
  if (!schedule) {
    throw new AppError(httpStatus.NOT_FOUND, 'Schedule not found');
  }
  return schedule;
};

const updateSlot = async (scheduleId: string, payload: any) => {
  const schedule = await prisma.slot.findUnique({
    where: {
      id: scheduleId,
    },
  });

  if (!schedule) {
    throw new AppError(httpStatus.NOT_FOUND, 'Schedule not found');
  }

  const updatedSchedule = await prisma.slot.update({
    where: { id: scheduleId },
    data: payload,
  });

  return updatedSchedule;
};

const deleteSlot = async (scheduleId: string) => {
  const schedule = await prisma.slot.findUnique({
    where: {
      id: scheduleId,
    },
  });

  if (!schedule) {
    throw new AppError(httpStatus.NOT_FOUND, 'Schedule not found');
  }

  await prisma.slot.delete({
    where: {
      id: scheduleId,
    },
  });

  return true;
};
export const SlotService = {
  generateSlots,
  getAllSlots,
  getScheduleByServiceId,
  getSlotById,
  updateSlot,
  deleteSlot,
};
