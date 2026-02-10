import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { RedisModule } from './../redis/redis.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [RedisModule, PrismaModule],
    controllers: [ProductsController],
    providers: [ProductsService],
})

export class ProductsModule { }
