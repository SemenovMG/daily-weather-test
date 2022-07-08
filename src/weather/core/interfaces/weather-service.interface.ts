import { DailyForecast } from '../entities';
import { WeatherRequestDto } from '../../application/dto/weather-request.dto';

export interface IWeatherService{
    getWeatherDescription(dto: WeatherRequestDto): Promise<DailyForecast>;
}