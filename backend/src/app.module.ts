import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { HealthController } from "./health/health.controller";
import { ProductsController } from "./products/products.controller";
//import { ProductsService } from "./products/products.service";
//import { OrdersController } from "./orders/orders.controller";
//import { OrdersService } from "./orders/orders.service";

@Module({
    controllers: [HealthController, ProductsController],
    providers: [PrismaService]
})
export class AppModule { }
