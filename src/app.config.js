import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

export const createLogger = (app) => {
    const logger = winston.createLogger({
        level: process.env.LOG_LEVEL || 'error',
        transports: [
            new DailyRotateFile({
                filename: `${process.env.LOG_FILE_PATH}${process.env.LOG_FILENAME_ALL}`,
                datePattern: 'YYYY-MM-DD'
            }),
            new DailyRotateFile({
                filename: `${process.env.LOG_FILE_PATH}${process.env.LOG_FILENAME_INFO}`,
                datePattern: 'YYYY-MM-DD',
                level: 'info',
            })
        ],
    });

    global.logger = logger;
}