import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import database from './config/database';
import { initializeAuth } from './config/auth';

database.connect();

const app = express();
app.use(bodyParser.json());
app.use(initializeAuth());
app.use('/', routes);

export default app;

