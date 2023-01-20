import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserId = createParamDecorator(async (data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return Number(request.user._id);
});
