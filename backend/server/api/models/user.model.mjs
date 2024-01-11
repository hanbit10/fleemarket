import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// User Schema
export const userSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }
);

const User = mongoose.model('User', userSchema); 

// get all users in DB - only for Dev
export async function getAll() {
  return User.find({});
}

export default User;
