import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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

export const createAPIDocument = (app) => {
    const apiDocOption = new DocumentBuilder();
    apiDocOption
      .setTitle('Recipe API')
      .setDescription('All know Recipe API')
      .build();
    
    const document = SwaggerModule.createDocument(app,apiDocOption);
    SwaggerModule.setup('api', app, document);
}