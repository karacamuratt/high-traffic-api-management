import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { rateLimiter } from "./common/rate-limit";
import pinoHttp from "pino-http";
import pino from "pino";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { logger: false });

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
    app.enableShutdownHooks();

    const port = Number(process.env.PORT ?? 3000);
    await app.listen(port);

    logger.info({ port }, "API started");
}
bootstrap();
