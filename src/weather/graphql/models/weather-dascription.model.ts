import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class WeatherDescription {
  @Field()
  description: string;
}