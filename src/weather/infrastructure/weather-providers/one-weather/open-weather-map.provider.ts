import { BadRequestException, Injectable } from '@nestjs/common';

import { DailyForecast } from '../../../../weather/core/entities';
import { IWeatherForecastProvider } from '../../../../weather/core/interfaces';
import { DateUtils } from '../../../../weather/core/utils/date.utils';

@Injectable()
export class OpenWeatherMapProvider implements IWeatherForecastProvider{
    private readonly baseUrl = "https://api.openweathermap.org/data/2.5/onecall?";
    private readonly apiKey = "fe758f34d5bbe8223eef5d5a2d36e61b";
    //We need to get only daily weather, so we can exclude all other parts
    private readonly excludes = "current,hourly,minutely,alerts";
    // One Call API 1.0 returns daily forecast for 8 days
    private readonly dailyForecastCount = 8;
    // One day shift in timestamp is 86400 seconds
    private readonly oneDayTsShift = 86400;

    async getDescriptionByLocationAndDate(latitude: number, longitude: number, date: string): Promise<DailyForecast> {
        let url = this.getUrl(latitude, longitude);
        let res = await fetch(url);
        let jsonData = await res.json();
        if (!jsonData || !jsonData.daily || jsonData.daily.length !== this.dailyForecastCount) {
            throw new BadRequestException("No data for this location");
        }
        return this.getDailyForecastByDate(jsonData, date);
    }

    private getUrl(latitude: number, longitude: number){
        return `${this.baseUrl}lat=${latitude}&lon=${longitude}&exclude=${this.excludes}&appid=${this.apiKey}`;
    }

    private getDailyForecastByDate(data: any, date: string): DailyForecast{
        let timeStamp = DateUtils.stringDateToTimestamp(date);
        // dt stores timestamp of forecast information
        let dateData = data.daily.find(d => d.dt > timeStamp && d.dt < timeStamp + this.oneDayTsShift);
        // Daily forecast holds weather property as an one element array
        if(!dateData || !dateData.weather[0] || !dateData.weather[0].description){
            throw new BadRequestException("No data for this date");
        }
        let description = dateData.weather[0].description;
        return {
            description
        }
    }
}