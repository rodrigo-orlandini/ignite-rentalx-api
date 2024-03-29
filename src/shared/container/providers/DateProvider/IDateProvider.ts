interface IDateProvider {
    compareInHours(startDate: Date, endDate: Date): number;
    compareInDays(startDate: Date, endDate: Date): number;
    convertToUTC(date: Date): string;
    dateNow(): Date;
    addDays(days: number): Date;
    addHours(hours: number): Date;
    compareIfBefore(startDate: Date, endDate: Date): boolean;
}

export { IDateProvider };