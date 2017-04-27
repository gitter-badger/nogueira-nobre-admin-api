import mongoose from 'mongoose';

const options = {
  server: {
    socketOptions: {
      keepAlive: 300000,
      connectTimeoutMS: 30000,
    },
  },
  replset: {
    socketOptions: {
      keepAlive: 300000,
      connectTimeoutMS: 30000,
    },
  },
};
const mongodbUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/nogueira-nobre';

mongoose.connect(mongodbUrl, options);

export default mongoose.connection;
