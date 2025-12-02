import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { WeatherModule } from './modules/weather/weather.module';
import { QuotableModule } from './modules/quotable/quotable.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb:27017/weather'),

    WeatherModule,
    UserModule,
    AuthModule,
    QuotableModule,
  ],
})
export class AppModule { }
