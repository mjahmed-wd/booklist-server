import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { userValidation } from './user.validation';

const router = express.Router();

router
  .route('/:id/wishlist')
  .post(
    validateRequest(userValidation.wishlistZodSchema),
    UserController.addBookToUserWishlist
  );

export const UserRoutes = router;
