import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { RedisService } from "./../redis/redis.service";

@Injectable()
export class ProductsService {
    constructor(
        private prisma: PrismaService,
        private readonly redisService: RedisService
    ) { }

    async list(page = 1, limit = 20) {
        page = Math.max(1, Number(page));
        limit = Math.min(100, Math.max(1, Number(limit)));

        const skip = (page - 1) * limit;
        const key = `products:list:v1:page=${page}:limit=${limit}`;
        const cached = await this.redisService.redis.get(key);

        if (cached) {
            console.log(`Cache hit for key: ${key}`);
            return JSON.parse(cached);
        }

        const [items, total] = await Promise.all([
            this.prisma.product.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
            }),

            this.prisma.product.count(),
        ]);

        const result = {
            data: items,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };

        console.log(`Cache miss for key: ${key}`);

        // Cache (10s)
        await this.redisService.redis.set(
            key,
            JSON.stringify(result),
            "EX",
            10
        );

        return result;
    }

    async get(id: string) {
        return this.prisma.product.findUnique({ where: { id } });
    }
}
