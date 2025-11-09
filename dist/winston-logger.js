// SPDX-License-Identifier: GPL-3.0-only
// Winston Logger - Winston-based implementation of the Logger interface
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { mergeConfig } from './config.js';
/**
 * Create Winston logger instance from configuration
 */
const createWinstonLogger = (config) => {
    const transports = [];
    // Console transport
    if (config.console.enabled) {
        const consoleFormat = config.json
            ? winston.format.json()
            : winston.format.combine(config.colorize ? winston.format.colorize() : winston.format.uncolorize(), config.timestamp ? winston.format.timestamp() : winston.format.uncolorize(), winston.format.printf(({ level, message, timestamp, service, module, ...meta }) => {
                const prefix = [];
                if (timestamp)
                    prefix.push(timestamp);
                if (service)
                    prefix.push(`[${service}]`);
                if (module)
                    prefix.push(`[${module}]`);
                const metaStr = Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : '';
                return `${prefix.join(' ')} ${level}: ${message}${metaStr}`;
            }));
        transports.push(new winston.transports.Console({
            level: config.console.level || config.level,
            format: consoleFormat,
            silent: config.silent,
        }));
    }
    // File transport
    if (config.file.enabled) {
        const fileFormat = config.json
            ? winston.format.json()
            : winston.format.combine(winston.format.timestamp(), winston.format.printf(({ level, message, timestamp, service, module, ...meta }) => {
                const prefix = [];
                if (timestamp)
                    prefix.push(timestamp);
                if (service)
                    prefix.push(`[${service}]`);
                if (module)
                    prefix.push(`[${module}]`);
                const metaStr = Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : '';
                return `${prefix.join(' ')} ${level}: ${message}${metaStr}`;
            }));
        transports.push(new DailyRotateFile({
            filename: config.file.filename || 'promethean-%DATE%.log',
            dirname: config.file.dirname || './logs',
            datePattern: config.file.datePattern || 'YYYY-MM-DD',
            maxSize: config.file.maxSize || '20m',
            maxFiles: config.file.maxFiles || '14d',
            level: config.level,
            format: fileFormat,
            silent: config.silent,
        }));
    }
    return winston.createLogger({
        level: config.level,
        defaultMeta: {
            service: config.service,
        },
        transports,
        exitOnError: false,
    });
};
/**
 * Winston-based Logger implementation
 */
export class WinstonLogger {
    winston;
    config;
    defaultContext;
    constructor(winstonLogger, config, defaultContext = {}) {
        this.winston = winstonLogger;
        this.config = { ...config };
        this.defaultContext = defaultContext;
    }
    error(message, context) {
        this.log('error', message, context);
    }
    warn(message, context) {
        this.log('warn', message, context);
    }
    info(message, context) {
        this.log('info', message, context);
    }
    http(message, context) {
        this.log('http', message, context);
    }
    verbose(message, context) {
        this.log('verbose', message, context);
    }
    debug(message, context) {
        this.log('debug', message, context);
    }
    silly(message, context) {
        this.log('silly', message, context);
    }
    log(level, message, context) {
        const mergedContext = { ...this.defaultContext, ...context };
        this.winston.log(level, message, mergedContext);
    }
    child(context) {
        const mergedContext = { ...this.defaultContext, ...context };
        return new WinstonLogger(this.winston, this.config, mergedContext);
    }
    setLevel(_level) {
        // TODO: Implement level changing by recreating the logger
        console.warn('Dynamic level changing not yet implemented');
    }
    getLevel() {
        return this.winston.level;
    }
}
/**
 * Create a new logger instance
 */
export const createLogger = (config = {}) => {
    const finalConfig = mergeConfig(config);
    const winstonLogger = createWinstonLogger(finalConfig);
    return new WinstonLogger(winstonLogger, finalConfig);
};
//# sourceMappingURL=winston-logger.js.map