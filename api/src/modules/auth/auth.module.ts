import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../user/user.module";
import { BlackistDataSchema, BlacklistData } from "src/schema/blacklist.schema";


@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1d' },
        }),

        MongooseModule.forFeature([
            { name: BlacklistData.name, schema: BlackistDataSchema, collection: 'blacklist' },
        ]),

        UserModule,
    ],
    controllers: [AuthController],
    providers: [AuthService],
})

export class AuthModule { }