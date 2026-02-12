import { Controller, Get, Header, Res } from '@nestjs/common';
import { MetricsService } from './metrics.service';

@Controller('metrics')
export class MetricsController {
    constructor(private metrics: MetricsService) { }

    @Get()
    @Header('Content-Type', 'text/plain')
    async metricsEndpoint() {
        return this.metrics.getMetrics();
    }
}
