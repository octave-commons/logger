import type { Logger, LoggerFactory, LoggerConfig } from './types.js';
/**
 * Global logger factory implementation
 */
declare class LoggerFactoryImpl implements LoggerFactory {
    private loggers;
    private globalConfig;
    create(config?: Partial<LoggerConfig>): Logger;
    get(name?: string): Logger;
    configure(config: Partial<LoggerConfig>): void;
    shutdown(): Promise<void>;
}
/**
 * Global logger factory instance
 */
export declare const loggerFactory: LoggerFactoryImpl;
/**
 * Create logger factory function
 */
export declare const createLoggerFactory: () => LoggerFactory;
/**
 * Convenience function to get the default logger
 */
export declare const getLogger: (name?: string) => Logger;
/**
 * Convenience function to create a new logger
 */
export declare const createNamedLogger: (name: string, config?: Partial<LoggerConfig>) => Logger;
export {};
//# sourceMappingURL=factory.d.ts.map