import { Type } from "class-transformer";
import { IsNumber, Max, Min } from "class-validator";

export class WeatherRequestDto{
    //latitude
    @IsNumber()
    @Type(() => Number)
    @Min(-90)
    @Max(90)
    public lat: number;
    //longitude
    @IsNumber()
    @Type(() => Number)
    @Min(-180)
    @Max(180)
    public lon: number;
    //Date tring format DD.MM.YYYY
    public date: string;
}