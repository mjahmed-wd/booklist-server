import httpStatus from 'http-status';
import { Types } from 'mongoose';
import ApiError from '../../../errors/ApiErrors';
import { IUser } from './user.interface';
import User from './user.model';

const createUser = async (user: IUser): Promise<IUser | null> => {
  const newUser = await User.create(user);
  return newUser;
};

const addBookToUserWishlist = async (
  id: string,
  bookId: string
): Promise<IUser | null> => {
  const user = await User.findById(id);

  if (user?.wishlist.includes(new Types.ObjectId(bookId))) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Already existing');
  }

  return await User.findByIdAndUpdate(
    id,
    {
      $push: { wishlist: bookId },
    },
    { new: true }
  );
};

const addBookToUserPlannedList = async (
  id: string,
  bookId: string
): Promise<IUser | null> => {
  const user = await User.findById(id);
  if (user?.plannedToRead.some(item => item.book.toString() === bookId)) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Already existing');
  }

  const newUser = await User.findByIdAndUpdate(
    id,
    {
      $push: {
        plannedToRead: {
          book: bookId,
          isFinished: false,
        },
      },
    },
    { new: true }
  );
  return newUser;
};

const finishBookFromUserPlannedList = async (
  id: string,
  bookId: string
): Promise<IUser | null> => {
  const user = await User.findOneAndUpdate(
    { _id: new Types.ObjectId(id), 'plannedToRead.book': bookId },
    { $set: { 'plannedToRead.$.isFinished': true } }
  );
  return user;
};

const getUser = async (id: string): Promise<IUser | null> => {
  const user = await User.findById(id);
  return user;
};

export const UserService = {
  getUser,
  createUser,
  addBookToUserWishlist,
  addBookToUserPlannedList,
  finishBookFromUserPlannedList,
};
