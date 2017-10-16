import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import database from './config/database';
import { initializeAuth } from './config/auth';

const app = express();

database.once('open', () => {
  console.log(`connected to  ${process.env.MONGODB_URL || 'mongodb://localhost:27017/nogueira-nobre'}`);
  app.use(bodyParser.json());
  app.use(initializeAuth());
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use('/', routes);
});

database.on('error', console.error.bind(console, 'connection error:'));

export default app;
