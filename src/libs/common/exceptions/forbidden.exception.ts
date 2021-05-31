import { ForbiddenException } from '@nestjs/common';

export class IncorrectPasswordException extends ForbiddenException {
  constructor(error?: string) {
    super('error.password.incorrect', error);
  }
}
export class IncorrectRefreshTokenException extends ForbiddenException {
  constructor(error?: string) {
    super('error.refreshToken.incorrect', error);
  }
}
