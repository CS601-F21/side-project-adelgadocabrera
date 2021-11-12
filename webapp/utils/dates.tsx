export const isDate = (date: any): boolean => {
  return Object.prototype.toString.call(date) === "[object Date]";
};
