import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

type CreateOrderDto = {
    productId: string;
    qty: number;
};

@Injectable()
export class OrdersService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreateOrderDto) {
        if (!dto.productId || !dto.qty || dto.qty <= 0) {
            throw new BadRequestException("Invalid payload");
        }

        return this.prisma.$transaction(async (tx) => {
            const product = await tx.product.findUnique({ where: { id: dto.productId } });
            if (!product) throw new BadRequestException("Product not found");
            if (product.stock < dto.qty) throw new BadRequestException("Out of stock");

            await tx.product.update({
                where: { id: dto.productId },
                data: { stock: { decrement: dto.qty } }
            });

            const total = product.price * dto.qty;

            const order = await tx.order.create({
                data: {
                    status: "CREATED",
                    total,
                    items: {
                        create: [{ productId: product.id, qty: dto.qty, price: product.price }]
                    }
                },
                include: { items: true }
            });

            return order;
        });
    }

    async get(id: string) {
        return this.prisma.order.findUnique({ where: { id }, include: { items: true } });
    }
}
