import { format, parse } from "date-fns";

export const DISPLAY_FORMAT = "dd-MM-yyyy";
const API_FORMAT = "yyyy-MM-dd";

export function toDisplayDate(apiDate: string): string {
  const parsed = parse(apiDate, API_FORMAT, new Date());
  return format(parsed, DISPLAY_FORMAT);
}

export function toApiDate(displayDate: string): string {
  const parsed = parse(displayDate, DISPLAY_FORMAT, new Date());
  return format(parsed, API_FORMAT);
}
