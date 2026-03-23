import { screen } from "@testing-library/react-native";
import Index from "../index";
import { useBankHolidays } from "../../hooks/useBankHolidays";
import { BankHolidayEvent } from "../../types/bankHolidays";
import { renderScreen } from "../../test/renderScreen";

jest.mock("../../hooks/useBankHolidays");

const mockUseBankHolidays = useBankHolidays as jest.MockedFunction<
  typeof useBankHolidays
>;

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

function mockHookReturn(
  overrides: Partial<ReturnType<typeof useBankHolidays>> = {},
) {
  mockUseBankHolidays.mockReturnValue({
    data: undefined,
    isPending: false,
    isError: false,
    ...overrides,
  } as ReturnType<typeof useBankHolidays>);
}

describe("Index screen", () => {
  beforeEach(() => {
    mockHookReturn({ data: [makeEvent()] });
  });

  it("shows a loading indicator while data is pending", () => {
    mockHookReturn({ isPending: true });

    renderScreen(<Index />);

    expect(screen.getByTestId("loading-indicator")).toBeTruthy();
  });

  it("shows an error message when the request fails", () => {
    mockHookReturn({ isError: true });

    renderScreen(<Index />);

    expect(
      screen.getByText("Something went wrong. Please try again later."),
    ).toBeTruthy();
  });

  it("renders holiday cards when data is available", () => {
    mockHookReturn({
      data: [
        makeEvent({ title: "Good Friday", date: "2026-04-03" }),
        makeEvent({ title: "Easter Monday", date: "2026-04-06" }),
      ],
    });

    renderScreen(<Index />);

    expect(screen.getByText("Good Friday")).toBeTruthy();
    expect(screen.getByText("Easter Monday")).toBeTruthy();
  });

  it("displays formatted dates on holiday cards", () => {
    mockHookReturn({
      data: [makeEvent({ title: "Good Friday", date: "2026-04-03" })],
    });

    renderScreen(<Index />);

    expect(screen.getByText("Friday, 3 April 2026")).toBeTruthy();
  });

  it("displays notes when present", () => {
    mockHookReturn({
      data: [
        makeEvent({
          title: "Boxing Day",
          date: "2026-12-28",
          notes: "Substitute day",
        }),
      ],
    });

    renderScreen(<Index />);

    expect(screen.getByText("Substitute day")).toBeTruthy();
  });
});
