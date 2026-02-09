import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { redis } from "../common/cache/redis.client";

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) { }

    async list() {
        const key = "products:list:v1";
        const cached = await redis.get(key);

        if (cached) {
            return JSON.parse(cached);
        }

        const products = await this.prisma.product.findMany({ orderBy: { createdAt: "desc" } });

        await redis.set(key, JSON.stringify(products), "EX", 10); // 10s cache

        return products;
    }

    async get(id: string) {
        return this.prisma.product.findUnique({ where: { id } });
    }
}
