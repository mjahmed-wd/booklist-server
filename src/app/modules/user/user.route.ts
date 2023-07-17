import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { userValidation } from './user.validation';

const router = express.Router();

router
  .route('/:id/wishlist')
  .post(
    validateRequest(userValidation.bookIdZodSchema),
    UserController.addBookToUserWishlist
  );

router
  .route('/:id/plannedToRead')
  .post(
    validateRequest(userValidation.bookIdZodSchema),
    UserController.addBookToUserPlannedList
  )
  .patch(
    validateRequest(userValidation.bookIdZodSchema),
    UserController.finishBookFromUserPlannedList
  );

export const UserRoutes = router;
