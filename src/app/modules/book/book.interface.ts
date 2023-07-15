import mongoose, { Model } from 'mongoose';

export type IReview = {
  user: mongoose.Types.ObjectId;
  comment: string;
};

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  reviews: IReview[];
}

export type BookModel = Model<IBook, Record<string, unknown>>;
