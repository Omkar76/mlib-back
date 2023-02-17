import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MediaModule } from './media/media.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [MediaModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
