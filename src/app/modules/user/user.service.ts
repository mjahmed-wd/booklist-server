import { Types } from 'mongoose';
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
  const newUser = await User.findByIdAndUpdate(id, {
    $push: { wishlist: bookId },
  });
  return newUser;
};

const addBookToUserPlannedList = async (
  id: string,
  bookId: string
): Promise<IUser | null> => {
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

export const UserService = {
  createUser,
  addBookToUserWishlist,
  addBookToUserPlannedList,
  finishBookFromUserPlannedList,
};
