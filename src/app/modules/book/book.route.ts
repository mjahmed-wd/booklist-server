import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './book.controller';
import { bookValidation } from './book.validation';

const router = express.Router();

router
  .route('/')
  .get(BookController.getAllBooks)
  .post(
    validateRequest(bookValidation.bookZodSchema),
    BookController.createBook
  );

router
  .route('/:id')
  .get(BookController.getSingleBook)
  .patch(BookController.updateSingleBook)
  .delete(BookController.deleteSingleBook);

router.route('/:id/review').post(BookController.updateSingleBookReview);

export const BookRoutes = router;
