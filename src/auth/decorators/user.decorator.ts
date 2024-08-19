import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((key: any, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();

  const user = req.user;

  if (!user) {
    return null;
  }

  return key ? user[key] : user;
});
