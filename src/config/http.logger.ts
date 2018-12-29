import { Request, Response } from 'express';
import * as fs from 'fs-extra';
import * as morgan from 'morgan';
import * as path from 'path';

import { config } from './config';

const rfs = require('rotating-file-stream');

const logDirectory = path.join(config.loggerConfig.httpLogger.path);

// ensure log directory exists
fs
  .ensureDir(logDirectory)
  .then(() => {
    console.log('success!');
  })
  .catch((err: Error) => {
    console.error(err);
  });
// create a rotating write stream
const accessLogStream = rfs(config.loggerConfig.httpLogger.file, {
  interval: '1d', // rotate daily
  path: logDirectory
});

// setup the logger
const morganConfig = {
  stream: accessLogStream,
  skip: (req: Request, res: Response) => res.statusCode < 400
};

export const httpLogger = morgan('common', morganConfig);
