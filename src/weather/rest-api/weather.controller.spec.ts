import { Test, TestingModule } from "@nestjs/testing";

import { DailyForecast } from "../core/entities";
import { IWeatherService } from "../core/interfaces";
import { WeatherController } from "./weather.controller";

describe('WeatherController', () => {
  let weatherController: WeatherController;
  let weatherService: IWeatherService;

  beforeEach(async () => {
    const module: TestingModule =
        await Test.createTestingModule({
          controllers: [WeatherController],
          providers: [
            {
              provide: 'IWeatherService',
              useValue: {},
            },
          ],
        })
        .compile();

        weatherController = module.get<WeatherController>(WeatherController);
        weatherService = module.get<IWeatherService>("IWeatherService");
  });
  
  describe('getWeatherDescription', () => {
    it('should return a weather description', async () => {
      const result: DailyForecast = {
        description: "light rain"
      };
      weatherService.getWeatherDescription = jest.fn().mockResolvedValue(result);

      let actResult = await weatherController
          .getWeatherDescription(null);
      
      expect(actResult).toBe(result);
    });
  });
});