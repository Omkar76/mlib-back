import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';


@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {
  }

  async validateUser(userDetails: UserDetails): Promise<User> {
    const user = await this.userService.findOrCreate(userDetails);
    console.log(user)
    return user;
  }

  login(user: any) {
    const payload = { username: user.email, sub: user.displayName };
    const token = this.jwtService.sign(payload);
    console.log(token)
    return token;
  }
}
