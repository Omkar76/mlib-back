import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';

@Module({
  controllers: [MediaController],
  providers: [MediaService, PrismaService],
  imports: []
})
export class MediaModule {}
