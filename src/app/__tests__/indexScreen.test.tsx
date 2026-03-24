import { screen, fireEvent } from "@testing-library/react-native";
import Index from "../index";
import { useBankHolidays } from "../../hooks/useBankHolidays";
import { BankHolidayEvent } from "../../types/bankHolidays";
import { renderScreen } from "../../test/renderScreen";
import { useQueryClient } from "@tanstack/react-query";

jest.mock("../../hooks/useBankHolidays");
jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQueryClient: jest.fn(),
}));

const mockInvalidateQueries = jest.fn();
const mockUseQueryClient = useQueryClient as jest.MockedFunction<
  typeof useQueryClient
>;

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
    isRefetching: false,
    ...overrides,
  } as ReturnType<typeof useBankHolidays>);
}

describe("Index screen", () => {
  beforeEach(() => {
    mockHookReturn({ data: [makeEvent()] });
    mockUseQueryClient.mockReturnValue({
      invalidateQueries: mockInvalidateQueries,
    } as unknown as ReturnType<typeof useQueryClient>);
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

  it("invalidates the cache and clears local edits when the user pulls to refresh", () => {
    mockHookReturn({
      data: [makeEvent({ title: "Good Friday", date: "2026-04-03" })],
    });

    renderScreen(<Index />);

    const flatList = screen.UNSAFE_getByType(require("react-native").FlatList);
    fireEvent(flatList, "refresh");

    expect(mockInvalidateQueries).toHaveBeenCalledWith({
      queryKey: ["bankHolidays"],
    });
  });
});
