import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';
import { SocketEvents } from '../socket.event';

/**
 * Service which handles the socket.io connection.
 *
 * Used, so that we don't need to create multiple connection instances.
 */
export class SocketIOService {
  private static instance: SocketIOService | null;

  public socket: Socket<any, any>;

  constructor() {
    this.socket = io('ws://localhost:3001');
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new SocketIOService();
    }

    return this.instance;
  }

  public emitEvent(event: SocketEvents, options?: any) {
    options ? this.socket.emit(event, options) : this.socket.emit(event);
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
  return instance;
}
