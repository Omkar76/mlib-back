import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from './user.service';

@Module({
    imports : [PrismaModule],
    providers : [PrismaService, UserService],
    exports : [UserService]
})
export class UserModule {

}
