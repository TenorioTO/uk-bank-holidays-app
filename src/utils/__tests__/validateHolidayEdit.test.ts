import { validateHolidayEdit } from "../validateHolidayEdit";

const NOW = new Date("2026-03-23");

describe("validateHolidayEdit", () => {
  it("returns valid for a correct title and date within the window", () => {
    const result = validateHolidayEdit("Good Friday", "2026-04-03", NOW);

    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it("returns an error when the title is empty", () => {
    const result = validateHolidayEdit("", "2026-04-03", NOW);

    expect(result.valid).toBe(false);
    expect(result.errors.title).toBe("Title cannot be empty.");
  });

  it("returns an error when the title is only whitespace", () => {
    const result = validateHolidayEdit("   ", "2026-04-03", NOW);

    expect(result.valid).toBe(false);
    expect(result.errors.title).toBe("Title cannot be empty.");
  });

  it("returns an error for an invalid date string", () => {
    const result = validateHolidayEdit("Holiday", "not-a-date", NOW);

    expect(result.valid).toBe(false);
    expect(result.errors.date).toBe("Please enter a valid date.");
  });

  it("returns an error when the date is in the past", () => {
    const result = validateHolidayEdit("Holiday", "2026-01-01", NOW);

    expect(result.valid).toBe(false);
    expect(result.errors.date).toBe("Date must be within the next 6 months.");
  });

  it("returns an error when the date is beyond the 6-month window", () => {
    const result = validateHolidayEdit("Holiday", "2026-12-25", NOW);

    expect(result.valid).toBe(false);
    expect(result.errors.date).toBe("Date must be within the next 6 months.");
  });

  it("accepts a date at the boundary of the 6-month window", () => {
    const result = validateHolidayEdit("Holiday", "2026-09-23", NOW);

    expect(result.valid).toBe(true);
  });

  it("returns both errors when title is empty and date is invalid", () => {
    const result = validateHolidayEdit("", "bad-date", NOW);

    expect(result.valid).toBe(false);
    expect(result.errors.title).toBe("Title cannot be empty.");
    expect(result.errors.date).toBe("Please enter a valid date.");
  });
});
