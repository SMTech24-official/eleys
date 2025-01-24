import prisma from '../../utils/prisma';
import { addMinutes, format } from 'date-fns';




// Slot.service: Module file for the Slot.service functionality.
const generateSlots = async (payload: {
  serviceId: string;
  startTime: Date;
  endTime: Date;
  date: Date;
}) => {
  const slots: any[] = [];
  let currentTime = payload.startTime;

  // Loop through the time range and generate slots
  while (currentTime < payload.endTime) {
    const nextTime = addMinutes(currentTime, 30); // Add 30 minutes to the current time
    slots.push({
      serviceId: payload.serviceId,
      startTime: currentTime,
      endTime: nextTime,
      date: payload.date,
      isBooked: false, 
      isAvailable: true, 
    });

    // Move to the next slot
    currentTime = nextTime;
  }

  // Create all slots in the database
  //   await prisma.slot.createMany({
  //     data: slots,
  //   });
};

export const SlotService = {
  generateSlots,
};
