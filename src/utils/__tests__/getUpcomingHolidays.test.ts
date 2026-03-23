import {
  BankHolidayEvent,
  BankHolidaysResponse,
} from "../../types/bankHolidays";
import { getUpcomingHolidays } from "../getUpcomingHolidays";

const NOW = new Date("2026-03-23");

function makeEvent(
  overrides: Partial<BankHolidayEvent> = {},
): BankHolidayEvent {
  return {
    title: "Bank Holiday",
    date: "2026-04-03",
    notes: "",
    bunting: true,
    ...overrides,
  };
}

function makeMockData({
  englandAndWales = [],
  scotland = [],
  northernIreland = [],
}: {
  englandAndWales?: BankHolidayEvent[];
  scotland?: BankHolidayEvent[];
  northernIreland?: BankHolidayEvent[];
} = {}): BankHolidaysResponse {
  return {
    "england-and-wales": {
      division: "england-and-wales",
      events: englandAndWales,
    },
    scotland: { division: "scotland", events: scotland },
    "northern-ireland": {
      division: "northern-ireland",
      events: northernIreland,
    },
  };
}

describe("getUpcomingHolidays", () => {
  it("returns holidays within the next 6 months sorted by date", () => {
    const data = makeMockData({
      englandAndWales: [
        makeEvent({ title: "Spring bank holiday", date: "2026-05-25" }),
        makeEvent({ title: "Good Friday", date: "2026-04-03", bunting: false }),
        makeEvent({ title: "Easter Monday", date: "2026-04-06" }),
      ],
    });

    const result = getUpcomingHolidays(data, NOW);

    expect(result.map((h) => h.title)).toEqual([
      "Good Friday",
      "Easter Monday",
      "Spring bank holiday",
    ]);
  });

  it("deduplicates events with the same date and title across divisions", () => {
    const sharedEvent = makeEvent({ title: "Good Friday", date: "2026-04-03" });

    const data = makeMockData({
      englandAndWales: [sharedEvent],
      scotland: [sharedEvent],
      northernIreland: [sharedEvent],
    });

    const result = getUpcomingHolidays(data, NOW);

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Good Friday");
  });

  it("keeps events with the same date but different titles", () => {
    const data = makeMockData({
      englandAndWales: [makeEvent({ title: "Holiday A", date: "2026-05-01" })],
      scotland: [makeEvent({ title: "Holiday B", date: "2026-05-01" })],
    });

    const result = getUpcomingHolidays(data, NOW);

    expect(result).toHaveLength(2);
  });

  it("excludes events in the past", () => {
    const data = makeMockData({
      englandAndWales: [
        makeEvent({ title: "Past Holiday", date: "2026-01-01" }),
        makeEvent({ title: "Future Holiday", date: "2026-04-03" }),
      ],
    });

    const result = getUpcomingHolidays(data, NOW);

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Future Holiday");
  });

  it("excludes events beyond the 6-month window", () => {
    const data = makeMockData({
      englandAndWales: [
        makeEvent({ title: "Within Window", date: "2026-09-01" }),
        makeEvent({ title: "Beyond Window", date: "2026-12-25" }),
      ],
    });

    const result = getUpcomingHolidays(data, NOW);

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Within Window");
  });

  it("returns at most 5 holidays", () => {
    const events = Array.from({ length: 8 }, (_, i) =>
      makeEvent({
        title: `Holiday ${i + 1}`,
        date: `2026-04-${String(i + 1).padStart(2, "0")}`,
      }),
    );

    const data = makeMockData({ englandAndWales: events });

    const result = getUpcomingHolidays(data, NOW);

    expect(result).toHaveLength(5);
  });

  it("returns an empty array when no holidays fall within the window", () => {
    const data = makeMockData({
      englandAndWales: [makeEvent({ title: "Far Future", date: "2027-06-01" })],
    });

    const result = getUpcomingHolidays(data, NOW);

    expect(result).toEqual([]);
  });
});
