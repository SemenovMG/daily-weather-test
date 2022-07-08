import { Module } from '@nestjs/common';

import { WeatherService } from './application/services';
import { DateProvider } from './application/utils';
import { OpenWeatherMapProvider } from './infrastructure/weather-providers/one-weather';
import { WeatherController } from './rest-api/weather.controller';

@Module({
  imports: [],
  controllers: [WeatherController],
  providers: [
    {
        provide: 'IWeatherService',
        useClass: WeatherService,
    },
    {
        provide: 'IWeatherForecastProvider',
        useClass: OpenWeatherMapProvider,
    },
    {
      provide: 'IDateProvider',
      useClass: DateProvider,
    }
  ],
})
export class WeatherModule {}