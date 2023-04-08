import type { Socket } from "socket.io-client";
import { io } from "socket.io-client";

/**
 * Service which handles the socket.io connection.
 *
 * Used, so that we don't need to create multiple connection instances.
 */
class SocketIOService {
  socket: Socket<any, any>;

  constructor() {
    this.socket = io("ws://localhost:3001");
  }
}

let instance: SocketIOService | null = null;

/**
 * Singleton
 */
export function getSocketIOService() {
  if (!instance) {
    instance = new SocketIOService();
  }
  return instance.socket;
}
