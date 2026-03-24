import { addMonths, isWithinInterval, parse, isValid } from "date-fns";
import { DISPLAY_FORMAT } from "./dateFormat";

interface ValidationResult {
  valid: boolean;
  errors: { title?: string; date?: string };
}

export function validateHolidayEdit(
  title: string,
  date: string,
  now = new Date(),
): ValidationResult {
  const errors: { title?: string; date?: string } = {};

  if (title.trim().length === 0) {
    errors.title = "Title cannot be empty.";
  }

  const parsed = parse(date, DISPLAY_FORMAT, new Date());
  if (!isValid(parsed)) {
    errors.date = "Please enter a valid date.";
  } else if (
    !isWithinInterval(parsed, { start: now, end: addMonths(now, 6) })
  ) {
    errors.date = "Date must be within the next 6 months.";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}
