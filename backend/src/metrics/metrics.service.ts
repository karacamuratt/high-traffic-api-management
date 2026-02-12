import { Injectable } from '@nestjs/common';
import * as client from 'prom-client';

@Injectable()
export class MetricsService {
    private readonly register: client.Registry;

    constructor() {
        this.register = new client.Registry();

        client.collectDefaultMetrics({
            register: this.register,
            prefix: 'htl_api_',
        });
    }

    async getMetrics() {
        return this.register.metrics();
    }

    getContentType() {
        return this.register.contentType;
    }
}
