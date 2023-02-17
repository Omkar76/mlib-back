import { Injectable } from '@nestjs/common';
import { Media } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MediaService {
    constructor(private prisma: PrismaService) { }
    getMedia(mediaID: number) {

        return this.prisma.media.findUnique({
            where: {
                id: mediaID
            }
        });
    }

    getAllMedia(){
        return this.prisma.media.findMany();
    }
    
    createMedia(media: Media) {
        return this.prisma.media.create({ data: media });
    }
}
