import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserId = createParamDecorator(async (data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  console.log({ user: request.user });
  return Number(request.user._id);
});
