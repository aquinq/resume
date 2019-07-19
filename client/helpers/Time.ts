export module Time {
  export function toMidnightUTC(date: Date | number): Date {
    return new Date(toMidnightUTCHours(date));
  }
  export function toMidnightUTCHours(date: Date | number): number {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  }

  export function getMinDate(dates: Date[]) {
    return Math.min.apply(null, dates);
  }

  export function getMaxDate(dates: Date[]) {
    return Math.max.apply(null, dates);
  }

  export function getDaysNumber(startDate: Date, endDate: Date) {
    return Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  }
}
