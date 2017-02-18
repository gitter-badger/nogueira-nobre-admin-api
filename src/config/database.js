import mongoose from 'mongoose';

const mongodbUrl = process.env.MONGODB_URL || 'mongodb://localhost/nogueira-nobre';

const connect = () => mongoose.connect(mongodbUrl);

export default { connect };

