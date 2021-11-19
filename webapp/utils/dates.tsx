import moment from "moment";

export const isDate = (date: any): boolean => {
  return Object.prototype.toString.call(date) === "[object Date]";
};

export const fromNow = (date: Date) => {
  const d: string = moment(date, "ddd MMM DD YYYY HH:mm:ss GMT Z").fromNow();
  const invalidDate: string = "Invalid date";
  return d == invalidDate ? "now" : d;
};
