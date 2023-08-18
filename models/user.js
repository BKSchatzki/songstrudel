import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  id: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
});

const User = models.User || model("User", userSchema);

export default User;
