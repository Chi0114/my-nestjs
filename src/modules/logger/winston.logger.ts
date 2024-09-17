import { createLogger } from "winston";
import * as winston from 'winston';
import { utilities } from 'nest-winston';


const instanceLogger = createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        utilities.format.nestLike(),
      ),
    }),
    new winston.transports.DailyRotateFile({
      dirname: process.env.LOG_DIR,
      filename: 'info-%DATE%.info.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '7d',
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.json(),
        winston.format.simple(),
      ),
      // 日志等级，不设置所有日志将在同一个文件
      level: 'info',
    }),
    //区分error日志和info日志，保存在不同文件，方便问题排查
    new winston.transports.DailyRotateFile({
      dirname: process.env.ERROR_DIR,
      filename: 'error-%DATE%.error.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.json(),
        winston.format.simple(),
      ),
      level: 'error',
    }),
  ],
});

export const instance = createLogger(instanceLogger)
