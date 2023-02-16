import { Controller, Get, Param } from '@nestjs/common';

@Controller('media')
export class MediaController {
    @Get("/:fileID")
    getMedia(@Param("fileID") fileID : string){
        return {fileID};
    }
}
