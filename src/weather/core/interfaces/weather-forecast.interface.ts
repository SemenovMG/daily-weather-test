import { DailyForecast } from "../entities";

export interface IWeatherForecastProvider{
    getDescriptionByLocationAndDate(latitude: number, longitude: number, timestamp: string): Promise<DailyForecast>;
}