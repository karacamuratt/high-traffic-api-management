import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { RedisService } from "./../redis/redis.service";

@Injectable()
export class ProductsService {
    constructor(
        private prisma: PrismaService,
        private readonly redisService: RedisService
    ) { }

    async list() {
        const key = "products:list:v1";
        const cached = await this.redisService.redis.get(key);

        if (cached) {
            return JSON.parse(cached);
        }

        const products = await this.prisma.product.findMany({ orderBy: { createdAt: "desc" } });

        await this.redisService.redis.set(key, JSON.stringify(products), "EX", 10); // 10s cache

        return products;
    }

    async get(id: string) {
        return this.prisma.product.findUnique({ where: { id } });
    }
}
