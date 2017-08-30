import mongoose from 'mongoose';

const mongodbUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/nogueira-nobre';

mongoose.connect(mongodbUrl, { useMongoClient: true });

export default mongoose.connection;
