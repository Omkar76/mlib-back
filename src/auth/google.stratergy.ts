import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20";
import { AuthService } from "./auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {

  constructor(private configService: ConfigService, private authService: AuthService) {
    super({
      
      clientID: configService.getOrThrow("GOOGLE_OAUTH_CLIENT_ID"),
      clientSecret: configService.getOrThrow("GOOGLE_OAUTH_CLIENT_SECRET"),
      callbackURL: 'http://localhost:3000/api/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback): Promise<any> {
    const user = await this.authService.validateUser({
      email: profile.emails[0].value,
      displayName: profile.displayName
    });

    done(null, user)
  }
}