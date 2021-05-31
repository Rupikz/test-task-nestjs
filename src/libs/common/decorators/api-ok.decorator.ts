import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';

export function ApiOk(operationOptions: ApiOperationOptions, responseOptions?: ApiResponseOptions) {
  return applyDecorators(HttpCode(HttpStatus.OK), ApiOperation(operationOptions), ApiOkResponse(responseOptions));
}
