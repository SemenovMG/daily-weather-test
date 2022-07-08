import { BadRequestException, Inject, Injectable } from "@nestjs/common";

import { DailyForecast } from "src/weather/core/entities";
import { IWeatherForecastProvider, IWeatherService } from "src/weather/core/interfaces";
import { WeatherRequestDto } from "../dto";

@Injectable()
export class WeatherService implements IWeatherService {
    constructor(
        @Inject("IWeatherForecastProvider")
        private readonly weatherProvider: IWeatherForecastProvider,
    ){}

    async getWeatherDescription(dto: WeatherRequestDto): Promise<DailyForecast> {

        return await this.weatherProvider.getDescriptionByLocationAndDate(dto.lat, dto.lon, dto.date);
    }
}