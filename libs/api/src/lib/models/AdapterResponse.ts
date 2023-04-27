import { HttpStatus } from '@nestjs/common';

/**
 * Response object, which is used from the studio-adapter.
 */
export default interface AdapterResponse<T> {
  statusCode: HttpStatus;
  data: T;
}
