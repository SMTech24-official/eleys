import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import prisma from '../../utils/prisma';

// Service.service: Module file for the Service functionality.

// Create a new service
const createService = async (payload: any) => {
  if (
    !payload.name ||
    !payload.specialization ||
    !payload.price ||
    !payload.duration ||
    !payload.doctorId
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Please provide all the required fields',
    );
  }

  const existingService = await prisma.service.findFirst({
    where: { name: payload.name, specialization: payload.specialization },
  });

  if (existingService) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Service already exists');
  }

  const isDoctorExist = await prisma.doctor.findUnique({
    where: { id: payload.doctorId },
  });

  if (!isDoctorExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Doctor does not exist');
  }
  const service = await prisma.service.create({
    data: payload,
  });

  return service;
};

// Get all services
const getAllServices = async () => {
  const services = await prisma.service.findMany({
    include: {
      slots: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return services;
};

// Get service by ID
const getServiceById = async (id: string) => {
  const service = await prisma.service.findUnique({
    where: { id },
  });

  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found');
  }

  return service;
};

// Update a service by ID
const updateService = async (id: string, payload: any) => {
  const existingService = await prisma.service.findUnique({
    where: { id },
  });

  if (!existingService) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found');
  }

  const updatedService = await prisma.service.update({
    where: { id },
    data: payload,
  });

  return updatedService;
};

const getServiceByDoctorId = async (doctorId: string) => {
  console.log(doctorId);

  if (!doctorId) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Doctor ID is required');
  }
  if (!/^[0-9a-fA-F]{24}$/.test(doctorId)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid doctor ID');
  }
  const isDoctorExist = await prisma.doctor.findFirst({
    where: { id: doctorId },
  });
  if (!isDoctorExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Doctor not found');
  }
  const services = await prisma.service.findMany({});

  return services;
};

// Delete a service by ID
const deleteService = async (id: string) => {
  const service = await prisma.service.findUnique({
    where: { id },
  });

  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found');
  }

  await prisma.service.delete({
    where: { id },
  });

  return { message: 'Service deleted successfully' };
};

export const ServiceService = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
  getServiceByDoctorId
};
