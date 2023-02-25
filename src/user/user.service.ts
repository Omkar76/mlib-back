import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async createUser(user: User) : Promise<User>{
        return await this.prisma.user.create({ data: user });
    }

    async findOrCreate(userDetails: UserDetails): Promise<User> {
    
        return await this.prisma.user.upsert({
            where: {
                email: userDetails.email
            },
            update: {},
            create: {
                email: userDetails.email,
                displayName: userDetails.displayName
            }
        });
    }

    findByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: {
                email: email
            }
        })
    }
}
