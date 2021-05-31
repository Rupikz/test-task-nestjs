import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('error.user.notFound', error);
  }
}
export class TegNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('error.teg.notFound', error);
  }
}
