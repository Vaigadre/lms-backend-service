import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import { httpLogger } from './config/http.logger';
import { logger } from './config/logger';
import { authToken } from './middlewares/auth-validator.middleware';
import indexRouter from './routes/index.route';

// Create Express server
const app = express();

// Express configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(httpLogger);

app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

/**
 * App routes.
 */
app.use('/v1/:tool', authToken, indexRouter);

app.use((err: any, req: any, res: any, next: any) => {
  if (err.isBoom) {
    return res.status(err.output.statusCode).json(err.output.payload);
  }
});

process.on('unhandledRejection', error => {
  console.error('Unhandled Promise Rejection: ', error);
});

logger.info('Appjs- Setting up.');

export default app;
