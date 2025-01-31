import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import prisma from '../../utils/prisma';
import emailSender from '../../utils/emailSernder';
import appoinmentClientEmail from '../../utils/appoinmentClintEmail';
import doctorAppoinmentEmail from '../../utils/doctorAppoinmentEmail';
import { StripeService } from '../Stripe/Stripe.service';
import { PaymentType } from '@prisma/client';
import { AppointmentPayload } from './Appointment.interface';

// Appointment.service: Module file for the Appointment.service functionality.

// create appointments
const createAppointment = async (payload: AppointmentPayload) => {
  const { serviceId, slotId } = payload;
  const isSlotExistInAppointment = await prisma.appointment.findUnique({
    where: { slotId },
  });
  if (isSlotExistInAppointment) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Slot is already booked');
  }
  const result = await prisma.$transaction(async prisma => {
    // Check if service exists
    const isServiceExist = await prisma.service.findUnique({
      where: { id: serviceId },
    });
    if (!isServiceExist) {
      throw new AppError(httpStatus.NOT_FOUND, 'Service not found');
    }

    // Check if the slot exists
    const isSlotExist = await prisma.slot.findUnique({
      where: { id: slotId },
    });
    if (!isSlotExist) {
      throw new AppError(httpStatus.NOT_FOUND, 'Slot not found');
    }

    // Check if the slot is available and not booked
    if (!isSlotExist.isAvailable) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Slot is not available');
    }

    if (isSlotExist.isBooked) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Slot is already booked');
    }

    if (payload.paymentType === PaymentType.FULL) {
      const paymentIntent = await StripeService.createPaymentIntent(
        isServiceExist.price,
        payload.paymentMethodId!,
      );

      // ! full payment
      if (paymentIntent.status === 'succeeded') {
        const appointment = await prisma.appointment.create({
          data: {
            serviceId: payload.serviceId,
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
            phone: payload.phone,
            address: payload.address,
            notes: payload.notes,
            slotId,
            paymentStatus: 'COMPLETED',
            paymentType: PaymentType.FULL,
            amountPaid: paymentIntent.amount_received / 100,
            remainingAmount: 0,
            payableAmount: isServiceExist.price,
          },
        });

        await prisma.payment.create({
          data: {
            paymentIntentId: paymentIntent.id,
            amount: paymentIntent.amount_received,
            status: 'COMPLETED',
            appointmentId: appointment.id,
          },
        });

        // Update the slot to mark it as booked
        await prisma.slot.update({
          where: { id: slotId },
          data: { isBooked: true, isAvailable: false },
        });

        return appointment;
      }
    }
    // ! partial payment
    else if (payload.paymentType === PaymentType.PARTIAL) {
      const paymentIntent = await StripeService.createPaymentIntent(
        payload.price!,
        payload.paymentMethodId!,
      );

      if (paymentIntent.status === 'succeeded') {
        const appointment = await prisma.appointment.create({
          data: {
            serviceId: payload.serviceId,
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
            phone: payload.phone,
            address: payload.address,
            notes: payload.notes,
            slotId,
            paymentStatus: 'PARTIAL',
            paymentType: PaymentType.PARTIAL,
            amountPaid: paymentIntent.amount_received / 100,
            remainingAmount:
              isServiceExist.price - paymentIntent.amount_received / 100,
            payableAmount: isServiceExist.price,
          },
        });

        await prisma.payment.create({
          data: {
            paymentIntentId: paymentIntent.id,
            amount: paymentIntent.amount_received / 100,
            status: 'PARTIAL',
            appointmentId: appointment.id,
          },
        });

        // Update the slot to mark it as booked
        await prisma.slot.update({
          where: { id: slotId },
          data: { isBooked: true, isAvailable: false },
        });
        return appointment;
      }
    }
    // !cash payment
    const appointment = await prisma.appointment.create({
      data: {
        serviceId: payload.serviceId,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        phone: payload.phone,
        address: payload.address,
        notes: payload.notes,
        slotId,
        paymentStatus: 'PENDING',
        paymentType: PaymentType.CASH,
        payableAmount: isServiceExist.price,
      },
    });

    // Update the slot to mark it as booked
    await prisma.slot.update({
      where: { id: slotId },
      data: { isBooked: true, isAvailable: false },
    });

    // Return the result of the appointment creation
    return appointment;
  });

  // If the transaction is successful, send emails
  await emailSender(
    'Your Appointment Slot is Reserved!',
    payload.email,
    appoinmentClientEmail(payload),
  );

  // Send email to the doctor
  await emailSender(
    'New Patient Appointment!',
    'fbelalhossain2072@gmail.com',
    doctorAppoinmentEmail(payload),
  );

  return result;
};

// Get all appointments
const getAllAppointments = async () => {
  const appointments = await prisma.appointment.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return appointments;
};

const getAllAppointmentsById = async (id: string) => {
  if (!id) throw new AppError(httpStatus.BAD_REQUEST, 'Invalid appointment ID');

  // Check if the appointment exists
  const appointment = await prisma.appointment.findUnique({
    where: { id },
  });

  if (!appointment)
    throw new AppError(httpStatus.NOT_FOUND, 'Appointment not found');

  return appointment;
};
const deleteAppointment = async (id: string) => {
  if (!id) throw new AppError(httpStatus.BAD_REQUEST, 'Invalid appointment ID');

  // Check if the appointment exists
  const appointment = await prisma.appointment.findUnique({
    where: { id },
  });

  if (!appointment)
    throw new AppError(httpStatus.NOT_FOUND, 'Appointment not found');
  const result = await prisma.appointment.delete({ where: { id } });
  return result;
};

export const AppointmentService = {
  createAppointment,
  getAllAppointments,
  getAllAppointmentsById,
  deleteAppointment,
};
