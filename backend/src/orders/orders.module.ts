import { Module } from '@nestjs/common';
import { RedisModule } from './../redis/redis.module';
import { PrismaModule } from '../prisma/prisma.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
    imports: [RedisModule, PrismaModule],
    controllers: [OrdersController],
    providers: [OrdersService],
})

export class OrdersModule { }
