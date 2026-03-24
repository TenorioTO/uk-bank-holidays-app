import { validateHolidayEdit } from "../validateHolidayEdit";

const NOW = new Date("2026-03-23");

describe("validateHolidayEdit", () => {
  it("returns valid for a correct title and date within the window", () => {
    const result = validateHolidayEdit("Good Friday", "03-04-2026", NOW);

    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it("returns an error when the title is empty", () => {
    const result = validateHolidayEdit("", "03-04-2026", NOW);

    expect(result.valid).toBe(false);
    expect(result.errors.title).toBe("Title cannot be empty.");
  });

  it("returns an error when the title is only whitespace", () => {
    const result = validateHolidayEdit("   ", "03-04-2026", NOW);

    expect(result.valid).toBe(false);
    expect(result.errors.title).toBe("Title cannot be empty.");
  });

  it("returns an error for an invalid date string", () => {
    const result = validateHolidayEdit("Holiday", "not-a-date", NOW);

    expect(result.valid).toBe(false);
    expect(result.errors.date).toBe("Please enter a valid date.");
  });

  it("returns an error when the date is in the past", () => {
    const result = validateHolidayEdit("Holiday", "01-01-2026", NOW);

    expect(result.valid).toBe(false);
    expect(result.errors.date).toBe("Date must be within the next 6 months.");
  });

  it("returns an error when the date is beyond the 6-month window", () => {
    const result = validateHolidayEdit("Holiday", "25-12-2026", NOW);

    expect(result.valid).toBe(false);
    expect(result.errors.date).toBe("Date must be within the next 6 months.");
  });

  it("accepts a date at the boundary of the 6-month window", () => {
    const result = validateHolidayEdit("Holiday", "23-09-2026", NOW);

    expect(result.valid).toBe(true);
  });

  it("returns both errors when title is empty and date is invalid", () => {
    const result = validateHolidayEdit("", "bad-date", NOW);

    expect(result.valid).toBe(false);
    expect(result.errors.title).toBe("Title cannot be empty.");
    expect(result.errors.date).toBe("Please enter a valid date.");
  });
});
