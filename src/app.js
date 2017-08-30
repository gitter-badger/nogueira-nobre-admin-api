import express from 'express';
import bodyParser from 'body-parser';
import AWS from 'aws-sdk';
import path from 'path';
import routes from './routes';
import database from './config/database';
import { initializeAuth } from './config/auth';

const app = express();

/**
 * AWS Config
 *
 */
AWS.config.loadFromPath(`${path.resolve(__dirname)}/config/aws-config.json`);

database.once('open', () => {
  console.log(`connected to  ${process.env.MONGODB_URL || 'mongodb://localhost:27017/nogueira-nobre'}`);
  app.use(bodyParser.json());
  app.use(initializeAuth());
  app.use('/', routes);
});

database.on('error', console.error.bind(console, 'connection error:'));

export default app;
