import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy {

    constructor() {
        super({
            datasources: {
                db: {
                    url: process.env.DIRECT_URL || process.env.DATABASE_URL,
                },
            },
        });
    }

    async onModuleInit() {
        try {
            await this.$connect();
            console.log("Prisma connected!✅");
        } catch (err) {
            console.error("Prisma connection failed!❌", err.message);
        }
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}
