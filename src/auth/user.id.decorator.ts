import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import mongoose from 'mongoose';

export const UserId = createParamDecorator(async (data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  console.log({ user: request.user });
  return new mongoose.Types.ObjectId(request.user._id);
});
