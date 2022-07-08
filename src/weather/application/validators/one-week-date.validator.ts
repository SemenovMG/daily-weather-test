import { Inject, Injectable } from "@nestjs/common";
import { IDateProvider, IDateValidator } from "src/weather/core/interfaces";
import { DateUtils } from "../../core/utils/date.utils";

@Injectable()
export class OneWeekDateValidator implements IDateValidator {
    constructor(
        @Inject('IDateProvider')
        private readonly dateProvider: IDateProvider
    ){}
    
    public validate(date: string): boolean{
        let today = this.dateProvider.now();
        today.setUTCHours(0,0,0,0);

        let weekAfter = this.dateProvider.now();
        weekAfter.setDate(today.getDate() + 7);
        weekAfter.setUTCHours(23,59,59,999);

        let todayTs = DateUtils.getTimestamp(today);
        let weekAfterTs = DateUtils.getTimestamp(weekAfter);
        let dateTs = DateUtils.stringDateToTimestamp(date);
        
        return dateTs >= todayTs && dateTs < weekAfterTs;
    }

    public getErrorMessage(): string{
        return "The date must be within the next 7 days";
    }
}