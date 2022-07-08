export class DateUtils {
    public static stringDateToTimestamp(dateStr: string): number{
        let dateElements = dateStr.split(".");
        let day = parseInt(dateElements[0]);
        let month = parseInt(dateElements[1]);
        let year = parseInt(dateElements[2]);        
        var newDate = new Date(Date.UTC(year, month - 1, day));
        return Math.floor(newDate.getTime()/1000);
    }

    public static getTimestamp(date: Date): number{
        return Math.floor(date.getTime()/1000);
    }
}