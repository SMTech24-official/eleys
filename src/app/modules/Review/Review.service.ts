import { Request } from 'express';
import { uploadToDigitalOceanAWS } from '../../utils/fileUploadAws';
import prisma from '../../utils/prisma';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

// Review.service: Module file for the Review.service functionality.
const CreateReview = async (req: Request) => {
  const file = req.file as any;

  const payload = JSON.parse(req.body.data);

  if (file) {
    payload.image = (await uploadToDigitalOceanAWS(file)).Location;
  }
  const result = await prisma.review.create({ data: payload });
  return result;
};

const GetAllReviews = async (page: number = 1, limit: number = 10) => {
    const skip = (page - 1) * limit;
  
    const reviews = await prisma.review.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
  
    const totalCount = await prisma.review.count();
  
    return {
      data: reviews,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    };
  };
  

const GetReviewById = async (id: string) => {
  if (!id) {
    throw new Error('ID is required to get a review');
  }
  const review = await prisma.review.findUnique({
    where: { id },
  });

  if (!review) {
    throw new Error(`Review with ID ${id} not found`);
  }

  return review;
};

const UpdateReview = async (req: Request, id: string) => {
  if (!id) {
    throw new Error('ID is required to update a review');
  }

  const review = await prisma.review.findUnique({
    where: { id },
  });

  if (!review) {
    throw new AppError(httpStatus.NOT_FOUND, `Review with ID ${id} not found`);
  }

  const file = req.file as Express.Multer.File | undefined;

  let payload = JSON.parse(req.body.data);

  if (file) {
    payload.image = (await uploadToDigitalOceanAWS(file)).Location;
  }

  const updatedReview = await prisma.review.update({
    where: { id },
    data: payload,
  });

  return updatedReview;
};

// DeleteReview: Function to delete a review by ID.
const DeleteReview = async (id: string) => {
  if (!id) {
    throw new Error('ID is required to delete a review');
  }
  const review = await prisma.review.findUnique({
    where: { id },
  });
  if (!review) {
    throw new AppError(httpStatus.NOT_FOUND, `Review with ID ${id} not found`);
  }
  const deletedReview = await prisma.review.delete({
    where: { id },
  });

  return deletedReview;
};

export const ReviewService = {
  CreateReview,
  GetAllReviews,
  GetReviewById,
  UpdateReview,
  DeleteReview,
};
