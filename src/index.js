// SPDX-License-Identifier: GPL-3.0-only
// Main Logger exports
// Configuration exports
export { createConfigFromEnv, mergeConfig, isValidLogLevel } from './config.js';
// Winston implementation exports
export { WinstonLogger, createLogger } from './winston-logger.js';
// Factory export
export { createLoggerFactory, getLogger, createNamedLogger } from './factory.js';
// Convenience exports for simple usage
export { loggerFactory } from './factory.js';
//# sourceMappingURL=index.js.map