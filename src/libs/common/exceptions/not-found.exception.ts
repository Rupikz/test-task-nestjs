import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('error.user.notFound', error);
  }
}
export class TagNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('error.tag.notFound', error);
  }
}
