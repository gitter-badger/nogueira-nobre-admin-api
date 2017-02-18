import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import database from './config/database';

database.connect().then(
  console.log('Conectado ao mongoDB'),
);

const app = express();
app.use(bodyParser.json());
app.use('/', routes);

export default app;

