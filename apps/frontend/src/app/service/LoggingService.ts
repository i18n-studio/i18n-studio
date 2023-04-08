/**
 * This service represent basic logging utilities.
 * The service itself is a singleton and should be used like this:
 *
 * @example
 * const loggingService = getLoggingService();
 */
class LoggingService {
  private readonly DEBUG_STATES = {
    ALL: "ALL",
    ERROR: "ERROR",
    NONE: "NONE",
  };

  private DEBUG_STATE = this.DEBUG_STATES.ALL;

  /**
   * Log an error in the application.
   * @param file where the error occurred
   * @param method which method / function throws this error
   * @param message containing some additional information
   */
  error(file: string, method: string, message: string) {
    if (
      this.checkDebugState(this.DEBUG_STATES.ALL) ||
      this.checkDebugState(this.DEBUG_STATES.ERROR)
    ) {
      console.error(`(${file}:${method}) => ${message}`);
    }
  }

  /**
   * Log an info in the application.
   * @param file where the info comes from
   * @param method which method / function which was called
   * @param message containing some additional information
   */
  info(file: string, method: string, message: string) {
    if (this.checkDebugState(this.DEBUG_STATES.ALL)) {
      console.info(`(${file}:${method}) => ${message}`);
    }
  }

  private checkDebugState(stateToCheck: string) {
    return this.DEBUG_STATE === stateToCheck;
  }
}

let instance: LoggingService | null = null;

/**
 * Singleton
 */
export function getLoggingService() {
  if (!instance) {
    instance = new LoggingService();
  }
  return instance;
}
