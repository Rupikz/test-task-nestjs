import { UtilsService } from 'src/utils/utils';
import { ValueTransformer } from 'typeorm';

export class PasswordTransformer implements ValueTransformer {
  to(value: string) {
    return UtilsService.generateHash(value);
  }

  from(value: string) {
    return value;
  }
}
