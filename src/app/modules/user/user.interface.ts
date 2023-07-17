/* eslint-disable no-unused-vars */
import mongoose, { Model } from 'mongoose';

export type IUser = {
  email: string;
  password: string;
  wishlist: mongoose.Types.ObjectId[];
  plannedToRead: { book: mongoose.Types.ObjectId[]; isFinished: boolean }[];
};

export type IsUserExist = Pick<IUser, 'password' | 'email'>;

export type UserModel = {
  isUserExist(id: string): Promise<IsUserExist>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
