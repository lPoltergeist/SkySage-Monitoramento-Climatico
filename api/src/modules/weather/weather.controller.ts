import { Body, Controller, Get, Post } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherData } from '../../schema/weatherData.schema';

@Controller()
export class WeatherController {
  constructor(private readonly appService: WeatherService) { }

  @Get('status')
  getStatus() {
    return { status: 'ok', message: 'Service is running' };
  }

  @Post('weather')
  postWeatherData(@Body() data: WeatherData) {
    this.appService.insertWeather(data);
  }

  @Get('weather')
  getAllWeatherData(): Promise<WeatherData[]> {
    return this.appService.returnAllWeather();
  }

  @Get('weather/insight')
  generateWeatherInsight(): Promise<string | undefined> {
    return this.appService.genAIWeatherInsight();
  }
}
