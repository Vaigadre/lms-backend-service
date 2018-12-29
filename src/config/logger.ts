const winston = require('winston');
const dailyRotateFile = require('winston-daily-rotate-file');

const transport = new dailyRotateFile({
    filename: '%DATE%.test.log'
});
export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log`
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.Console({
            format: winston.format.simple()
        }),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
        transport

    ]
});




