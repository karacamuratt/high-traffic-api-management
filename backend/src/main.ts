import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { rateLimiter } from "./common/rate-limit";
import pinoHttp from "pino-http";
import pino from "pino";
import { NestExpressApplication } from "@nestjs/platform-express";
import { bootstrapDatabase } from "./db/bootstrap";

async function bootstrap() {
    if (process.env.AUTO_MIGRATE === 'true') {
        await bootstrapDatabase();
    }

    const app = await NestFactory.create<NestExpressApplication>(
        AppModule,
        { logger: false }
    );

    app.set('trust proxy', 1);

    const loggerInstance = {
        level: process.env.NODE_ENV === "production" ? "info" : "debug",
        transport:
            process.env.NODE_ENV === "production"
                ? undefined
                : {
                    target: "pino-pretty",
                    options: {
                        colorize: true,
                        translateTime: "SYS:standard",
                        ignore: "pid,hostname",
                        singleLine: false,
                    },
                },
    };

    const logger = pino(loggerInstance);

    app.use(pinoHttp({ logger }));
    app.use(rateLimiter());
    app.setGlobalPrefix('api');

    const port = Number(process.env.PORT?.trim() || 3000);

    await app.listen(port);

    logger.info({ port }, "API started");
}
bootstrap();
