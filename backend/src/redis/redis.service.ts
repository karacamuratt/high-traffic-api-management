import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
    private readonly client: Redis;

    constructor(private readonly config: ConfigService) {
        this.client = new Redis(
            this.config.get<string>('REDIS_URL', 'redis://localhost:6379'),
            {
                maxRetriesPerRequest: 2,
                enableReadyCheck: true,
                lazyConnect: false,
            },
        );
    }

    get redis(): Redis {
        return this.client;
    }

    async onModuleDestroy() {
        await this.client.quit();
    }
}
