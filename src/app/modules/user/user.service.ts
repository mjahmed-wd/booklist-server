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

export const UserService = {
  createUser,
  addBookToUserWishlist,
};
