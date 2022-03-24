// import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from './config/firebase-config.js';
// import morgan from 'morgan';
import router from './routes/index.js';

// express app
const app = express();
app.use(cors());

// body parse configuration
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use('/api/v1', router);

// Error handling to catch 404
app.all('*', (_req, res) => {
  res.status(404).json({
    error: 'address Not found',
  });
});

// Starting server
app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});
