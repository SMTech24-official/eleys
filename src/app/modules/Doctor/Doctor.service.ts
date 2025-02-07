import { Request } from 'express';
import prisma from '../../utils/prisma';
import { uploadToDigitalOceanAWS } from '../../utils/fileUploadAws';

// Create a new doctor
const createDoctor = async (req: Request) => {
  const file = req.file as any;
  const payload = JSON.parse(req.body.data);

  if (file) {
    payload.profileImage = (await uploadToDigitalOceanAWS(file)).Location;
  }

  const doctor = await prisma.doctor.create({
    data: payload,
  });
  return doctor;
};

// Get all doctors
const getAllDoctors = async () => {
  const doctors = await prisma.doctor.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return doctors;
};

// Get a single doctor by ID
const getDoctorById = async (id: string) => {
  const doctor = await prisma.doctor.findUnique({
    where: { id },
  });
  if (!doctor) {
    throw new Error('Doctor not found');
  }
  return doctor;
};

// Update doctor details
const updateDoctor = async (req: Request) => {
  const file = req.file as any;
  const payload = JSON.parse(req.body.data);
  const existingDoctor = await prisma.doctor.findUnique({
    where: { id: req.params.id },
  });

  if (!existingDoctor) {
    throw new Error('Doctor not found');
  }

  // Check if there's an image file in the update request
  if (file) {
    payload.profileImage = (await uploadToDigitalOceanAWS(file)).Location;
  }

  const updatedDoctor = await prisma.doctor.update({
    where: { id: req.params.id },
    data: payload,
  });

  return updatedDoctor;
};

// Delete a doctor by ID
const deleteDoctor = async (id: string) => {
  const existingDoctor = await prisma.doctor.findUnique({
    where: { id },
  });

  if (!existingDoctor) {
    throw new Error('Doctor not found');
  }

  const deletedDoctor = await prisma.doctor.delete({
    where: { id },
  });

  return deletedDoctor;
};

export const DoctorService = {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
