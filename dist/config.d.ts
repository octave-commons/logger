import type { LoggerConfig, LogLevel } from './types.js';
/**
 * Create configuration from environment variables
 */
export declare const createConfigFromEnv: () => LoggerConfig;
/**
 * Merge user configuration with defaults
 */
export declare const mergeConfig: (userConfig?: Partial<LoggerConfig>) => LoggerConfig;
/**
 * Validate log level
 */
export declare const isValidLogLevel: (level: string) => level is LogLevel;
//# sourceMappingURL=config.d.ts.map