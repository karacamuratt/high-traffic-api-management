import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { OrdersService } from "./orders.service";

@Controller("orders")
export class OrdersController {
    constructor(private orders: OrdersService) { }

    @Post()
    create(@Body() body: { productId: string; qty: number }) {
        return this.orders.create(body);
    }

    @Get(":id")
    get(@Param("id") id: string) {
        return this.orders.get(id);
    }
}
