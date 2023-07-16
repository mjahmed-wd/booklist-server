import mongoose, { Schema } from 'mongoose';

import { BookModel, IBook } from './book.interface';

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publicationDate: { type: String, required: true },
    reviews: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        comment: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        delete ret.__v;
        delete ret._id;
      },
    },
  }
);

const Book = mongoose.model<IBook, BookModel>('Book', bookSchema);

export default Book;
