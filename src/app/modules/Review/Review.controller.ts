// Review.controller: Module file for the Review.controller functionality.

import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ReviewService } from './Review.service';
import { Request, Response } from 'express';

const createReview = catchAsync(async (req, res) => {
  const result = await ReviewService.CreateReview(req);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Review created successfully',
    data: result,
  });
});

// Get All Reviews
const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query;
  const result = await ReviewService.GetAllReviews(Number(page), Number(limit));

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Reviews fetched successfully',
    data: result,
  });
});

// Get Single Review by ID
const getReviewById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ReviewService.GetReviewById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Review fetched successfully',
    data: result,
  });
});

// Update Review by ID
const updateReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ReviewService.UpdateReview(req, id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Review updated successfully',
    data: result,
  });
});

// Delete Review by ID
const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ReviewService.DeleteReview(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Review deleted successfully',
    data: result,
  });
});

export const ReviewController = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
};
