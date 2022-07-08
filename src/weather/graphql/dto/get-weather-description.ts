import { Field, ArgsType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsNumber, Max, Min } from "class-validator";

@ArgsType()
export class GetWeatherDescriptionArgs {
    //latitude
    @Field()
    @IsNumber()
    @Type(() => Number)
    @Min(-90)
    @Max(90)
    public lat: number;

    //longitude
    @Field()
    @IsNumber()
    @Type(() => Number)
    @Min(-180)
    @Max(180)
    public lon: number;

    //Date tring format DD.MM.YYYY
    @Field()
    public date: string;
}