import { Body, Controller, Get, Param, ParseIntPipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Media } from '@prisma/client';
import { diskStorage } from 'multer';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {

    constructor(private mediaService: MediaService) { }

    @Get("/:mediaID")
    async getMedia(@Param("mediaID", ParseIntPipe) mediaID: number) {

        const media: Media = await this.mediaService.getMedia(mediaID);

        if (media) {
            return {
                status: "success",
                data: { media }
            };
        }

        return { status: "fail", message: "Not found" }
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: "uploads",
            filename(req, file, callback) {
                callback(null, new Date().toISOString());
            },
        })
    }))
    uploadFile(@UploadedFile("file") file: Express.Multer.File) {
        if(!file){
            return {
                status : "failure"
            }
        }
        return {
            status: "success",
            data: {
                filename: file.filename
            }
        }
    }
    
    async createMedia(@Body() media: Media) {
        this.mediaService.createMedia(media);
    }

}
