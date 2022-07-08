import { Args, Query, Resolver } from "@nestjs/graphql";
import { Inject } from '@nestjs/common';

import { GetWeatherDescriptionArgs } from '../dto/get-weather-description';
import { IWeatherService } from './../../core/interfaces';
import { WeatherDescription } from './../models/weather-dascription.model';

@Resolver(of => WeatherDescription)
export class WeatherDescriptionResolver {
  constructor(
    @Inject('IWeatherService')
    private readonly weatherService: IWeatherService,
  ){}

  @Query(returns => WeatherDescription)
  async weatherDescription(@Args() dto: GetWeatherDescriptionArgs) {
    return await this.weatherService.getWeatherDescription(dto);
  }
}