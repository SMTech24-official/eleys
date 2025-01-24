// Doctor.service: Module file for the Doctor.service functionality.

import { Request } from 'express';
import prisma from '../../utils/prisma';
import { service } from './Doctor.interface';

export const createDoctor = async (req:Request) => {
    const file=req.file as any
  return await prisma.doctor.create({
    data: payload,
  });
};

export const getDoctorById = async (id: string) => {
  return await prisma.doctor.findUnique({
    where: { id },
  });
};

export const getAllDoctors = async () => {
  return await prisma.doctor.findMany();
};

export const updateDoctor = async (
  id: string,
  data: {
    name?: string;
    title?: string;
    specialization?: string;
    profileImage?: string;
  },
) => {
  return await prisma.doctor.update({
    where: { id },
    data,
  });
};

export const deleteDoctor = async (id: string) => {
  return await prisma.doctor.delete({
    where: { id },
  });
};
