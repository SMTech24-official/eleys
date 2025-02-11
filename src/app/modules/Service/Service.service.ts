import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import prisma from '../../utils/prisma';
import { Request } from 'express';
import { uploadToDigitalOceanAWS } from '../../utils/fileUploadAws';

// Service.service: Module file for the Service functionality.

// Create a new service
const createService = async (req: Request) => {
  let payload: any = {};


  try {
    payload = JSON.parse(req.body.data);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Invalid JSON data Error parsing JSON',
    );
  }
  const isDoctorExist = await prisma.doctor.findUnique({
    where: { id: payload.doctorId },
  });

  if (!isDoctorExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Doctor does not exist');
  }

  
  const existingService = await prisma.service.findFirst({
    where: { name: payload.name, specialization: payload.specialization },
  });

  if (existingService) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Service already exists');
  }


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


  const images = req.files;

  let galleryImages: Express.Multer.File[] | Express.Multer.File[][];
  if (Array.isArray(images)) {
    galleryImages = images;
  } else if (images && 'galleryImages' in images) {
    galleryImages = images.galleryImages;
  } else {
    galleryImages = [];
  }

  payload.galleryImages = await Promise.all(
    galleryImages.map(async (image) => {
      if (Array.isArray(image)) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Invalid image format');
      }
      return {
        url: (await uploadToDigitalOceanAWS(image)).Location,
      };
    })
  );



  let thumbImage: Express.Multer.File | undefined;
  if (images && !Array.isArray(images) && 'thumbImage' in images) {
    thumbImage = Array.isArray(images.thumbImage)
      ? images.thumbImage[0]
      : images.thumbImage;
  }



  //uploadToDigital
  if (thumbImage) {
    payload.thumbImage = (await uploadToDigitalOceanAWS(thumbImage)).Location;
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
const updateService = async (id: string, req: Request) => {
  let payload: any = {};

  // Parse the incoming JSON data
  try {
    payload = JSON.parse(req.body.data);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Invalid JSON data. Error parsing JSON.',
    );
  }

  // Check if the service exists
  const existingService = await prisma.service.findUnique({
    where: { id },
  });

  if (!existingService) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found');
  }

  // If doctorId is provided, verify if the doctor exists
  if (payload.doctorId) {
    const isDoctorExist = await prisma.doctor.findUnique({
      where: { id: payload.doctorId },
    });

    if (!isDoctorExist) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Doctor does not exist');
    }
  }

  // Handle images if provided
  const images = req.files;

  let galleryImages: Express.Multer.File[] | Express.Multer.File[][] = [];
  if (Array.isArray(images)) {
    galleryImages = images;
  } else if (images && 'galleryImages' in images) {
    galleryImages = images.galleryImages;
  }

  if (galleryImages.length) {
    payload.galleryImages = await Promise.all(
      galleryImages.map(async (image) => {
        if (Array.isArray(image)) {
          throw new AppError(httpStatus.BAD_REQUEST, 'Invalid image format');
        }
        return {
          url: (await uploadToDigitalOceanAWS(image)).Location,
        };
      })
    );
  }

  let thumbImage: Express.Multer.File | undefined;
  if (images && !Array.isArray(images) && 'thumbImage' in images) {
    thumbImage = Array.isArray(images.thumbImage)
      ? images.thumbImage[0]
      : images.thumbImage;
  }

  if (thumbImage) {
    payload.thumbImage = (await uploadToDigitalOceanAWS(thumbImage)).Location;
  }

  // Update the service with new data
  const updatedService = await prisma.service.update({
    where: { id },
    data: payload,
  });

  return updatedService;
};

const getServiceByDoctorId = async (doctorId: string) => {
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
  const services = await prisma.service.findMany({
    where: { doctorId },
    include: {
      slots: {
        where: {
          isAvailable: true,
          isBooked: false,
        },
      },
    },
  });

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
  getServiceByDoctorId,
};
