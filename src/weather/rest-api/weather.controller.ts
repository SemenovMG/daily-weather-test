import { Controller, Get, Inject, Query } from "@nestjs/common";

import { WeatherRequestDto } from "../application/dto";
import { DailyForecast } from "../core/entities";
import { IWeatherService } from "../core/interfaces";

@Controller('weather')
export class WeatherController{
    constructor(
        @Inject('IWeatherService')
        private readonly weatherService: IWeatherService,
    ){}

    @Get('daily/description')
    public async getWeatherDescription(
        @Query() dto: WeatherRequestDto
    ): Promise<DailyForecast> {
        return await this.weatherService.getWeatherDescription(dto);
    }
}