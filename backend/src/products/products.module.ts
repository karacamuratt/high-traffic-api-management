import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { RedisModule } from './../redis/redis.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [RedisModule, PrismaModule],
    controllers: [ProductsController],
    providers: [ProductsService],
})

export class ProductsModule { }
