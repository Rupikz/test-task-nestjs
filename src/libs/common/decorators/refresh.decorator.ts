import { createParamDecorator } from '@nestjs/common';
import { UtilsService } from 'src/utils/utils';

export const RefreshSession = createParamDecorator((_data, ctx) => {
  const request = ctx.switchToHttp().getRequest();
  const refreshToken = UtilsService.parseAuthHeader(request.headers.authorization);
  const user = request.user;
  return { ...user, refreshToken };
});
