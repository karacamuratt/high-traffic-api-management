import { Controller, Get } from "@nestjs/common";

@Controller("health")
export class HealthController {
    @Get()
    health() {
        return {
            status: 'ok',
            port: process.env.PORT,
            pid: process.pid,
        };
    }

}
