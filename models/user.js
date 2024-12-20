import {
  model,
  models,
  Schema,
} from 'mongoose';

const userSchema = new Schema(
  {
    id: {
      type: String,
      unique: [true, 'This id already exists.'],
      required: [true, 'An id is required.'],
    },
    username: {
      type: String,
      unique: [true, 'This username already exists.'],
      required: [true, 'A username is required.'],
      index: true,
    },
  },
  { timestamps: true }
);

const User = models.User || model('User', userSchema);

export default User;
