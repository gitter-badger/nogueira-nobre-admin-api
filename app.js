import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);

export default app;
