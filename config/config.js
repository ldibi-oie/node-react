const bunyan = require('bunyan');
const pjs = require('../package.json');

const { name, version } = pjs;


const logInfos = (serviceName, serviceVersion, level) => bunyan.createLogger({ name: `${serviceName}:${serviceVersion}`, level });

module.exports = {
    development: {
        name,
        version,
        serviceTimeout: 30,
        log: () => logInfos(name, version, 'debug'),
        postgres: {
            options: {
                host: 'localhost',
                port: 5432,
                dialect: 'postgres',
                server: 'db',
                username: 'root',
                password: 'password',
                database: 'app',
                logging: message => logInfos(name, version, 'debug').info(message)
            },
            client: null
        }
    },
    production: {
        name,
        version,
        serviceTimeout: 30,
        log: () => logInfos(name, version, 'info'),
    },
    test: {
        name,
        version,
        serviceTimeout: 30,
        log: () => logInfos(name, version, 'fatal'),
    },
};
