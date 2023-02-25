import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService : ConfigService) {
    super({
      jwtFromRequest: (req : Request)=>{
        const token =  req.cookies["token"];
        console.log(req.cookies)
        // console.log("token", token)
        return token;
      },
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow("JWT_SECRET_KEY"),
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}