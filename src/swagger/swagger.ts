import path = require('path');

const fs = require('fs');
const swaggerJSDoc = require('swagger-jsdoc');

const rootDir = path.join(__dirname, '../routes');
const routerList: string[] = [];
fs.readdirSync(rootDir).forEach((file: string) => {
  if (path.extname(file) === '.js') {
    routerList.push(path.join(rootDir, file));
  }
});
routerList.push(path.join(__dirname, '../util/response-builder.js'));
// swagger specifications
const swaggerDefinition = {
  info: {
    // API informations (required)
    title: 'Tool Backend ',
    version: '1.0.0',
    description: 'This is Tool Back-End API' // Description (optional)
  },
  host: 'localhost:3000',
  basePath: '/v1', // Base path (optional)
  securityDefinitions: {
    token: {
      type: 'apiKey',
      name: 'authorization',
      in: 'header'
    }
  },
  schemes: ['http']
};
// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: routerList
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);
const swaggerSpecjson = JSON.stringify(swaggerSpec);

// writing produced swaggerSpecjson to a file to serve it to swagger-ui
fs.writeFile('./dist/swagger/swagger.json', swaggerSpecjson, 'utf8');
