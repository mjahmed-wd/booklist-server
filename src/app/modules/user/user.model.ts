import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { IUser, IsUserExist, UserModel } from './user.interface';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiErrors';
import config from '../../../config';
const { Schema } = mongoose;

export const userSchema = new Schema<IUser, UserModel>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    wishlist: [{ type: Schema.Types.ObjectId, ref: 'Book', default: [] }],
    plannedToRead: [
      {
        type: {
          book: { type: Schema.Types.ObjectId, ref: 'Book' },
          isFinished: { type: Boolean, default: false },
        },
        default: [],
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
        delete ret.password;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
  }
);

userSchema.statics.isUserExist = async function (
  email: string
): Promise<IsUserExist | null> {
  return await User.findOne({ email }, { id: 1, password: 1, role: 1 });
};

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

userSchema.pre('findOneAndUpdate', async function (next) {
  const isExist = await User.findById(this.getQuery()._id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }
  if ((this.getUpdate() as any)?.password) {
    (this.getUpdate() as any).password = await bcrypt.hash(
      (this.getUpdate() as any).password,
      Number(config.bycrypt_salt_rounds)
    );
  }
  next();
});

userSchema.pre('save', async function (next) {
  const isExist = await User.findOne({
    email: this.email,
  });
  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, 'User email already exists !');
  }
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrypt_salt_rounds)
  );
  next();
});

const User = mongoose.model<IUser, UserModel>('User', userSchema);

export default User;
