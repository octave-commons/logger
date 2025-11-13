// SPDX-License-Identifier: GPL-3.0-only
// Logger Factory - Factory for creating and managing logger instances
import { createLogger } from './winston-logger.js';
/**
 * Global logger factory implementation
 */
class LoggerFactoryImpl {
    loggers = new Map();
    globalConfig = {};
    create(config = {}) {
        return createLogger({ ...this.globalConfig, ...config });
    }
    get(name) {
        const key = name || 'default';
        if (!this.loggers.has(key)) {
            const logger = this.create({ module: name });
            this.loggers.set(key, logger);
        }
        return this.loggers.get(key);
    }
    configure(config) {
        this.globalConfig = { ...this.globalConfig, ...config };
        // Update existing loggers
        this.loggers.forEach((_, key) => {
            const module = key === 'default' ? undefined : key;
            this.loggers.set(key, this.create({ ...this.globalConfig, module }));
        });
    }
    async shutdown() {
        // Close all Winston loggers
        const shutdownPromises = Array.from(this.loggers.values()).map(async (logger) => {
            // Access the underlying Winston logger and close it
            const winstonLogger = logger.winston;
            if (winstonLogger && typeof winstonLogger.close === 'function') {
                await new Promise((resolve) => {
                    winstonLogger.close(() => resolve());
                });
            }
        });
        await Promise.all(shutdownPromises);
        this.loggers.clear();
    }
}
/**
 * Global logger factory instance
 */
export const loggerFactory = new LoggerFactoryImpl();
/**
 * Create logger factory function
 */
export const createLoggerFactory = () => {
    return loggerFactory;
};
/**
 * Convenience function to get the default logger
 */
export const getLogger = (name) => {
    return loggerFactory.get(name);
};
/**
 * Convenience function to create a new logger
 */
export const createNamedLogger = (name, config) => {
    return loggerFactory.create({ ...config, module: name });
};
//# sourceMappingURL=factory.js.map