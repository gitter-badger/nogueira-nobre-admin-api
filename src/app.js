import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import database from './config/database';
import { initializeAuth } from './config/auth';

const app = express();
database.once('open', () => {
  app.use(bodyParser.json());
  app.use(initializeAuth());
  app.use('/', routes);
});

database.on('error', console.error.bind(console, 'connection error:'));

export default app;
