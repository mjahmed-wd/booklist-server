import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiErrors';
import { IBook, IReview } from './book.interface';
import Book from './book.model';

const createBook = async (book: IBook): Promise<IBook | null> => {
  return await Book.create(book);
};

const getAllBooks = async (): Promise<IBook[]> => {
  return await Book.find({});
};

const getSingleBook = async (id: string): Promise<IBook | null> => {
  return await Book.findById(id);
};

const updateSingleBook = async (id: string,
  payload: Partial<IBook>): Promise<IBook | null> => {
  const isExist = await Book.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found !');
  }

  const { ...bookData } = payload;

  const updatedBookData: Partial<IBook> = { ...bookData };

  const result = await Book.findByIdAndUpdate(
    id,
    updatedBookData,
    {
      new: true,
    }
  );
  
  return result;
};

const updateSingleBookReview = async (id: string,
  payload: IReview): Promise<IBook | null> => {
  const isExist = await Book.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found !');
  }

  const { user, comment } = payload;

  const result = await Book.findByIdAndUpdate(
    id,
    { $push: { reviews: { user, comment } } },
    { new: true }
  );
  
  return result;
};

const deleteSingleBook = async (id: string): Promise<IBook | null> => {
  return await Book.findByIdAndDelete(id)
};


export const BookService = {
    createBook,
    getAllBooks,
    getSingleBook,
    deleteSingleBook,
    updateSingleBook,
    updateSingleBookReview
};
