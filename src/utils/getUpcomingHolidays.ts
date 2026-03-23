import { addMonths, isWithinInterval, parseISO } from "date-fns";
import {
  BankHolidayEvent,
  BankHolidaysResponse,
} from "../types/bankHolidays";

const MONTHS_WINDOW = 6;
const MAX_HOLIDAYS = 5;

interface Accumulator {
  seen: Set<string>;
  holidays: BankHolidayEvent[];
}

export function getUpcomingHolidays(
  data: BankHolidaysResponse,
  now = new Date(),
): BankHolidayEvent[] {
  const cutoff = addMonths(now, MONTHS_WINDOW);

  const allEvents = [
    ...data["england-and-wales"].events,
    ...data["scotland"].events,
    ...data["northern-ireland"].events,
  ];

  const { holidays } = allEvents.reduce<Accumulator>(
    (acc, event) => {
      const key = `${event.date}|${event.title}`;
      if (acc.seen.has(key)) return acc;

      const eventDate = parseISO(event.date);
      if (!isWithinInterval(eventDate, { start: now, end: cutoff })) return acc;

      acc.seen.add(key);
      acc.holidays.push(event);
      return acc;
    },
    { seen: new Set(), holidays: [] },
  );

  return holidays
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, MAX_HOLIDAYS);
}
