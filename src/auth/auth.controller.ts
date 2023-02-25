import { Controller, Get, Req, Res, UseGuards, } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Get("/google")
    @UseGuards(AuthGuard('google'))
    googleAuth(@Req() req: Request) {
        return { message: "Google auth" }
    }

    @Get("/google/redirect")
    @UseGuards(AuthGuard('google'))
    googleLoginCallback(@Req() req: Request, @Res() res : Response) {
        const token = this.authService.login(req.user)
        res.cookie('token', token, {httpOnly: true, maxAge : 9000000});
        res.send({succes : true})
    }

    // @Get("/ok")
    // @UseGuards(AuthGuard('jwt'))    
    // bro() {
    //     return {success: true}
    // }
}
