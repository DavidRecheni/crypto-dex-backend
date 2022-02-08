const swaggerAutogen = require('swagger-autogen')()

//swaggerAutogen();

const doc = {
  info: {
    version: '0.1', // by default: '1.0.0'
    title: 'Chaintree API', // by default: 'REST API'
    description: 'Welcome to Chaintree API v0.1. For any suggestions please contact feedback@chaintree.xyz', // by default: ''
  },
  basePath: '',
};

const outputFile = './swagger.json';
const endpointsFiles = [
  './controllers/catalog.ts',
  './controllers/user.ts',
  './controllers/wallet.ts',
  './controllers/address.ts',
];

swaggerAutogen(outputFile, endpointsFiles, doc);
