import { createParamDecorator } from '@nestjs/common';
import { UtilsService } from 'src/utils/utils';

export const AuthSession = createParamDecorator((_data, ctx) => {
  const request = ctx.switchToHttp().getRequest();
  const accessToken = UtilsService.parseAuthHeader(request.headers.authorization);
  const user = request.user;
  return { ...user, accessToken };
});
