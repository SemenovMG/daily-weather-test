import { Test, TestingModule } from "@nestjs/testing";
import { BadRequestException } from "@nestjs/common";

import { DailyForecast } from 'src/weather/core/entities';
import { IDateValidator, IWeatherForecastProvider } from "src/weather/core/interfaces";
import { WeatherService } from "./weather.service";
import { WeatherRequestDto } from "../dto";

describe('WeatherController', () => {
    let weatherProvider: IWeatherForecastProvider;
    let dateValidator: IDateValidator;
    let weatherService: WeatherService;
    const result: DailyForecast = {
        description: "light rain"
    };
    const fakeDto: WeatherRequestDto = {
        date: "10.06.2022",
        lat: 33,
        lon: 25,
    }

    beforeEach(async () => {
        const module: TestingModule =
            await Test.createTestingModule({
                providers: [
                    {
                        provide: 'IWeatherService',
                        useClass: WeatherService,
                    },
                    {
                        provide: 'IWeatherForecastProvider',
                        useValue: {}
                    },
                    {
                        provide: 'IDateValidator',
                        useValue: {}
                    },
                ],
            })
                .compile();

        weatherService = module.get<WeatherService>("IWeatherService");
        weatherProvider = module.get<IWeatherForecastProvider>("IWeatherForecastProvider");
        dateValidator = module.get<IDateValidator>("IDateValidator");
    });

    describe('getWeatherDescription', () => {

        it('should return a weather description', async () => {
            weatherProvider.getDescriptionByLocationAndDate = jest.fn().mockResolvedValue(result);
            dateValidator.validate = jest.fn().mockImplementation(() => true);

            let actResult = await weatherService.getWeatherDescription(fakeDto);        

            expect(actResult).toBe(result);
        });

        it('should throw an BadRequestException if validation failed', async () => {
            weatherProvider.getDescriptionByLocationAndDate = jest.fn().mockResolvedValue(result);
            dateValidator.validate = jest.fn().mockImplementation(() => false);
            dateValidator.getErrorMessage = jest.fn().mockImplementation(() => "");

            let act = async () => {
                await weatherService
                        .getWeatherDescription(fakeDto)
            };

            await expect(act)
                .rejects
                .toThrow(BadRequestException);
        });
    });
});