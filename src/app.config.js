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

    if(process.env.NODE_ENV === 'dev') {
        logger.add(new winston.transports.Console({
            format: winston.format.simple()
        }));
    }

    global.logger = logger;
}

export const createAPIDocument = (app) => {
    const apiDocOption = new DocumentBuilder()
      .setTitle('Recipe API')
      .setDescription('All know Recipe API')
      .addBearerAuth('Authorization','header')
      .build();
    
    const document = SwaggerModule.createDocument(app,apiDocOption);
    SwaggerModule.setup('api', app, document);
}