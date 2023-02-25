import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { GoogleGuard } from './auth/google.guard';

@Controller("/")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req : Request): string {
    return JSON.stringify(req.user);
  }
}
