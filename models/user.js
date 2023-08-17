import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  discordId: { type: String, unique: true, required: true },
  discordUsername: { type: String, unique: true, required: true },
  discordAvatar: { type: String },
});

const User = models.User || model("User", userSchema);

export default User;
