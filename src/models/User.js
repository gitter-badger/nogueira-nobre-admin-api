import mongoose from 'mongoose';

mongoose.Promise = Promise;
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  email: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
});

const User = mongoose.model('users', userSchema);

export default User;
