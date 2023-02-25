import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";

@Injectable()
export class GoogleGuard extends AuthGuard('google') {
  async canActivate(context: ExecutionContext) {
    // const req = context.switchToHttp().getRequest();
    const activate = await super.canActivate(context);
    const request: Request = context.switchToHttp().getRequest();
    await super.logIn(request)
    // if (!req.user) {
    //   await super.logIn(request);
    //   return true;
    //   // Save the user to the session
    //   // request.session.user = request.user;
    // }
    return activate as boolean;
  }
}
