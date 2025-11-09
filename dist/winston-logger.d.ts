import winston from 'winston';
import type { Logger, LoggerConfig, LogLevel, LogContext } from './types.js';
/**
 * Winston-based Logger implementation
 */
export declare class WinstonLogger implements Logger {
    private readonly winston;
    private config;
    private readonly defaultContext;
    constructor(winstonLogger: winston.Logger, config: LoggerConfig, defaultContext?: LogContext);
    error(message: string, context?: LogContext): void;
    warn(message: string, context?: LogContext): void;
    info(message: string, context?: LogContext): void;
    http(message: string, context?: LogContext): void;
    verbose(message: string, context?: LogContext): void;
    debug(message: string, context?: LogContext): void;
    silly(message: string, context?: LogContext): void;
    log(level: LogLevel, message: string, context?: LogContext): void;
    child(context: LogContext): Logger;
    setLevel(_level: LogLevel): void;
    getLevel(): LogLevel;
}
/**
 * Create a new logger instance
 */
export declare const createLogger: (config?: Partial<LoggerConfig>) => Logger;
//# sourceMappingURL=winston-logger.d.ts.map