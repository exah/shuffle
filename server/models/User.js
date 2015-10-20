import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  roomID: { type: String, required: true },
  userID: { type: String, required: true, index: { unique: true } },
  secret: { type: String, required: true },
  avatar: { type: String, required: true },
  nick: { type: String, required: true },
  color: { type: String, required: false },
});

const User = mongoose.model('User', userSchema);

export {userSchema, User};
