export type SocketEventType =
  | 'CONNECT'
  | 'DISCONNECT'
  | 'GET_FILE_CONTENT'
  | 'GET_FILES';

/**
 * Register for every socket event.
 */
export const SocketEvent = new Map<SocketEventType, string>([
  ['CONNECT', 'connect'],
  ['DISCONNECT', 'disconnect'],
  ['GET_FILE_CONTENT', 'fileContent'],
  ['GET_FILES', 'files'],
]);
