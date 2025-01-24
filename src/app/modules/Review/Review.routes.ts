import express from 'express';
import { ReviewController } from './Review.controller';
import { fileUploader } from '../../utils/fileUploader';

const router = express.Router();

// Create Review
router.post('/', fileUploader.uploadSingle, ReviewController.createReview);

// Get All Reviews
router.get('/', ReviewController.getAllReviews);

// Get Review by ID
router.get('/:id', ReviewController.getReviewById);

// Update Review by ID
router.put('/:id', fileUploader.uploadSingle, ReviewController.updateReview);

// Delete Review by ID
router.delete('/:id', ReviewController.deleteReview);

export const ReviewRoutes = router;
