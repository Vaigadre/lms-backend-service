import * as fs from 'fs';
import * as path from 'path';
import app from './app';
import { config, HTTPPORT, HTTPSPORT, NODE_ENV } from './config/config';
import { connectToDB } from './config/db';

const https = require('https');
const http = require('http');

const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, './config/ssl-cert/server.key')),
  cert: fs.readFileSync(path.join(__dirname, './config/ssl-cert/server.crt'))
};

connectToDB()
  .then(() => {
    startServer();
  })
  .catch(error => {
    console.log('Error while connecting to DB.', error);
  });
/**
 * Start Express server.
 */
function startServer() {
  const httpServer = http.createServer(app);
  const httpsServer = https.createServer(sslOptions, app);

  httpServer.listen(HTTPPORT);
  httpsServer.listen(HTTPSPORT);
  // app.listen(PORT, () => {
  //   console.log(
  //     '  App is running at http://localhost:%d in %s mode',
  //     PORT,
  //     NODE_ENV
  //   );
  //   console.log('  Press CTRL-C to stop\n');
  // });
}
