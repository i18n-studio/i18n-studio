import { Ref, ref } from 'vue';
import { SocketEvents } from '../../socket.event';
import { SocketIOService } from '../../service/SocketIOService';
import LoggingService from '../../../../../../libs/api/src/lib/service/LoggingService';
import AdapterResponse from '../../../../../../libs/api/src/lib/models/AdapterResponse';
import { HttpStatus } from '@nestjs/common';

// /**
//  * Check socket connection for incoming events and return
//  * the value from the server.
//  * @param socketEvent which event should be listened to.
//  * @param defaultValue the default value of the response.
//  * @param successCallback the success callback, useful if the server
//  *                        doesn't send any callback (e. g. on connect).
//  * @param errorCallback returns a function, which is executed if an error
//                         happens.
//  */
export const useSocketOn = <T = any>(
  socketEvent: SocketEvents,
  defaultValue?: T,
  successCallback?: boolean,
  errorCallback?: (error: any) => void
): Ref<AdapterResponse<T>> => {
  // Get an instance of the SocketIOService and LoggingService
  const socketIOService = SocketIOService.getInstance();
  const loggingService = LoggingService.getInstance();

  // If the socket event is undefined, log an error and return the default value or null
  if (!socketEvent) {
    const error = new Error(`Event ${socketEvent} is undefined.`);
    loggingService.error('useSocketOn', 'error', error.message);
    throw error;
  }

  // Create a reactive response object with the default
  const response = ref<AdapterResponse<T>>();
  if (defaultValue) {
    response.value = { statusCode: HttpStatus.OK, data: defaultValue };
  }

  // Listen for the socket event and update the response object accordingly
  socketIOService.socket.on(socketEvent, (res: AdapterResponse<T>) => {
    loggingService.info('useSocketOn', socketEvent, 'Event captured.');
    if (successCallback) {
      // If successCallback is true, update the response object with the successCallback value
      response.value = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: successCallback as T,
      };
    } else {
      response.value = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: res.data,
      };
    }
  });

  // Listen for errors from the socket connection and handle them using the errorCallback function (if provided)
  socketIOService.socket.on('error', (error: any) => {
    if (errorCallback) {
      errorCallback(error);
    } else {
      loggingService.error('useSocketOn', 'error', error.message);
    }
  });

  // Return the reactive response object
  // @ts-ignore - this can not be undefined
  return response;
};
