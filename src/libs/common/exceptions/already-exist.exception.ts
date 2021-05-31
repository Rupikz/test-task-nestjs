import { ConflictException } from '@nestjs/common';

export class UserEmailOrNicknameExistException extends ConflictException {
  constructor(error?: string) {
    super('error.user.emailOrNicknameExist', error);
  }
}
export class UserNicknameExistException extends ConflictException {
  constructor(error?: string) {
    super('error.user.nicknameExist', error);
  }
}

export class TagNameExistException extends ConflictException {
  constructor(error?: string) {
    super('error.tag.nameExist', error);
  }
}
