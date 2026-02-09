import { Controller, Get, Param } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController {
    constructor(private products: ProductsService) { }

    @Get()
    list() {
        return this.products.list();
    }

    @Get(":id")
    get(@Param("id") id: string) {
        return this.products.get(id);
    }
}
