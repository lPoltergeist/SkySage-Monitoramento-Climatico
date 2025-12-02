import { Module } from "@nestjs/common";
import { QuotableController } from "./quotable.controller";
import { QuotableService } from "./quotable.service";


@Module({
    imports: [],
    controllers: [QuotableController],
    providers: [QuotableService],
    exports: [QuotableService],
})

export class QuotableModule { }