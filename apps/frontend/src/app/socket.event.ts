/**
 * Enum containing the socket events used in the application.
 *
 * @enum {string}
 * @readonly
 */
export enum SocketEvents {
  /**
   * Triggered when a client connects to the server.
   */
  'CONNECT' = 'connect',

  /**
   * Triggered when a client disconnects from the server.
   */
  'DISCONNECT' = 'disconnect',

  /**
   * Triggered when a client requests the content of a file.
   */
  'GET_FILE_CONTENT' = 'fileContent',

  /**
   * Triggered when a client requests a list of files.
   */
  'GET_FILES' = 'files',

  /**
   * Triggered when a client performs a soft analysis on a file.
   */
  'SOFT_ANALYZE' = 'softAnalyze',
}
