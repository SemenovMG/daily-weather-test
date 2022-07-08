import { Injectable } from "@nestjs/common";
import { IDateProvider } from "src/weather/core/interfaces";

@Injectable()
export class DateProvider implements IDateProvider {
    now(): Date {
        return new Date();
    }
}