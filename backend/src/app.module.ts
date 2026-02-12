import { Module } from "@nestjs/common";
import { HealthController } from "./health/health.controller";
import { ConfigModule } from "@nestjs/config";
import { RedisModule } from "./redis/redis.module";
import { ProductsModule } from "./products/products.module";
import { PrismaModule } from "./prisma/prisma.module";
import { MetricsModule } from "./metrics/metrics.module";
import { OrdersModule } from "./orders/orders.module";
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
            expandVariables: true,
        }),
        RedisModule,
        ProductsModule,
        OrdersModule,
        PrismaModule,
        MetricsModule,
    ],
    controllers: [HealthController],
    providers: [],
})

export class AppModule { }
