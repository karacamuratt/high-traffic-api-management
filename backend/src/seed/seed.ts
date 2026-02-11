import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { PrismaService } from '../prisma/prisma.service';

async function main() {
    const app = await NestFactory.createApplicationContext(AppModule);

    const prisma = app.get(PrismaService);

    const existing = await prisma.product.count();

    if (existing > 0) {
        console.log('Seed skipped (products already exist).');
        await app.close();
        return;
    }

    await prisma.product.createMany({
        data: Array.from({ length: 50 }).map((_, i) => ({
            name: `Product #${i + 1}`,
            price: 100 + i * 5,
            stock: 10_000,
        })),
    });

    console.log('Seed done.');

    await app.close();
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
