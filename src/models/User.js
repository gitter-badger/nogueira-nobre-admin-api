import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

mongoose.Promise = Promise;
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  email: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
});

userSchema.pre('save', function (next) {
  // only hash the password if it has been modified (or is new)
  if (this.isModified('password')) {
    // generate a salt
    const salt = bcrypt.genSaltSync();
    // hash the password using our new salt
    this.password = bcrypt.hashSync(this.password, salt);
    next();
  }
  next();
});


userSchema.methods.comparePassword = (encodedPassword) => {
  bcrypt.compareSync(encodedPassword, this.password);
};

const User = mongoose.model('users', userSchema);

export default User;
