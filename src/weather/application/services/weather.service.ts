import { BadRequestException, Inject, Injectable } from "@nestjs/common";

import { DailyForecast } from "src/weather/core/entities";
import { IDateValidator, IWeatherForecastProvider, IWeatherService } from "src/weather/core/interfaces";
import { WeatherRequestDto } from "../dto";

@Injectable()
export class WeatherService implements IWeatherService {
    constructor(
        @Inject("IWeatherForecastProvider")
        private readonly weatherProvider: IWeatherForecastProvider,
        @Inject("IDateValidator")
        private readonly dateValidator: IDateValidator,
    ){}

    async getWeatherDescription(dto: WeatherRequestDto): Promise<DailyForecast> {
        if (!this.dateValidator.validate(dto.date)){
            throw new BadRequestException(this.dateValidator.getErrorMessage());
        }
        
        return await this.weatherProvider.getDescriptionByLocationAndDate(dto.lat, dto.lon, dto.date);
    }
}