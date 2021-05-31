import { ConflictException } from '@nestjs/common';

export class UserEmailExistException extends ConflictException {
  constructor(error?: string) {
    super('error.user.emailExist', error);
  }
}
export class UserNicknameExistException extends ConflictException {
  constructor(error?: string) {
    super('error.user.nicknameExist', error);
  }
}
