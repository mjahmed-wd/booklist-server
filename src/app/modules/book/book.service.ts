import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiErrors';
import { bookSearchableFields } from './book.constant';
import { IBook, IBookFilters, IReview } from './book.interface';
import Book from './book.model';

const createBook = async (book: IBook): Promise<IBook | null> => {
  return await Book.create(book);
};

const getAllBooks = async (filters: IBookFilters): Promise<IBook[]> => {
  const { searchTerm, ...filtersData } = filters;

  console.log(filtersData);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const queryCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Book.find(queryCondition);
  return result;
  // return await Book.find({});
};

const getSingleBook = async (id: string): Promise<IBook | null> => {
  return await Book.findById(id);
};

const updateSingleBook = async (
  id: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const isExist = await Book.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found !');
  }

  const { ...bookData } = payload;

  const updatedBookData: Partial<IBook> = { ...bookData };

  const result = await Book.findByIdAndUpdate(id, updatedBookData, {
    new: true,
  });

  return result;
};

const updateSingleBookReview = async (
  id: string,
  payload: IReview
): Promise<IBook | null> => {
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
  return await Book.findByIdAndDelete(id);
};

export const BookService = {
  createBook,
  getAllBooks,
  getSingleBook,
  deleteSingleBook,
  updateSingleBook,
  updateSingleBookReview,
};
