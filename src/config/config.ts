import * as fs from 'fs';
import * as path from 'path';

export const HTTPPORT = process.env.PORT || 3001;
export const HTTPSPORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || 'dev';

const publicCert = fs.readFileSync(
  path.join(__dirname, '../config/ssl-cert/ssl-cert.crt')
); // get public key

export const CONSTANT = {
  QUESTIONSTATUS: ['INPROGRESS', 'SAVED', 'SUBMITTED']
};

const appName = 'ts-setup';
const baseConfig = {
  mongoDBURI: 'mongodb://localhost/ltipoc',
  appName,
  publicCert,
  loggerConfig: {
    httpLogger: {
      file: 'http.log',
      path: `http-logs`
    }
  }
};

let configData = { ...baseConfig };
function generateConfig() {
  switch (NODE_ENV) {
    case 'local':
      configData = {
        ...baseConfig,
        mongoDBURI: 'mongodb://localhost:27017/tools_database'
      };
      break;
    case 'dev':
      configData = {
        ...baseConfig,
        mongoDBURI: 'mongodb://dev:1234dev@localhost:27017/tools_database'
      };
      break;
    case 'uat':
      configData = {
        ...baseConfig,
        mongoDBURI: 'mongodb://dev:1234dev@localhost:27017/tools_database'
      };
      break;
    case 'prod':
      configData = {
        ...baseConfig,
        mongoDBURI: 'mongodb://dev:1234dev@localhost:27017/tools_database'
      };
      break;
    default:
      break;
  }
}
generateConfig();
export const config = configData;
