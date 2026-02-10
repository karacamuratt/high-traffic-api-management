import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { HealthController } from "./health/health.controller";
import { ConfigModule } from "@nestjs/config";
import { RedisModule } from "./redis/redis.module";
import { ProductsModule } from "./products/products.module";
import { PrismaModule } from "./prisma/prisma.module";
//import { OrdersController } from "./orders/orders.controller";
//import { OrdersService } from "./orders/orders.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
            expandVariables: true,
        }),
        RedisModule,
        ProductsModule,
        PrismaModule,
    ],
    controllers: [HealthController],
    providers: [],
})
export class AppModule { }
