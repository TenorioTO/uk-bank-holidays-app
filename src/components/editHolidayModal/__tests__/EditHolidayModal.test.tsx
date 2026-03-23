import { screen, fireEvent } from "@testing-library/react-native";
import EditHolidayModal from "../EditHolidayModal";
import { BankHolidayEvent } from "../../../types/bankHolidays";
import { renderScreen } from "../../../test/renderScreen";

jest.mock("../../../utils/validateHolidayEdit", () => ({
  validateHolidayEdit: jest.fn(),
}));

import { validateHolidayEdit } from "../../../utils/validateHolidayEdit";

const mockValidate = validateHolidayEdit as jest.MockedFunction<
  typeof validateHolidayEdit
>;

function makeEvent(
  overrides: Partial<BankHolidayEvent> = {},
): BankHolidayEvent {
  return {
    title: "Good Friday",
    date: "2026-04-03",
    notes: "",
    bunting: false,
    ...overrides,
  };
}

const defaultProps = {
  holiday: makeEvent(),
  visible: true,
  onClose: jest.fn(),
  onSave: jest.fn(),
};

describe("EditHolidayModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockValidate.mockReturnValue({ valid: true, errors: {} });
  });

  it("renders the modal with pre-filled values", () => {
    renderScreen(<EditHolidayModal {...defaultProps} />);

    expect(screen.getByText("Edit Holiday")).toBeTruthy();
    expect(screen.getByDisplayValue("Good Friday")).toBeTruthy();
    expect(screen.getByDisplayValue("2026-04-03")).toBeTruthy();
  });

  it("calls onSave and onClose when validation passes", () => {
    const onSave = jest.fn();
    const onClose = jest.fn();

    renderScreen(
      <EditHolidayModal {...defaultProps} onSave={onSave} onClose={onClose} />,
    );

    fireEvent.press(screen.getByText("Save"));

    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({ title: "Good Friday", date: "2026-04-03" }),
    );
    expect(onClose).toHaveBeenCalled();
  });

  it("does not call onSave when validation fails", () => {
    mockValidate.mockReturnValue({
      valid: false,
      errors: { title: "Title cannot be empty." },
    });

    const onSave = jest.fn();

    renderScreen(<EditHolidayModal {...defaultProps} onSave={onSave} />);

    fireEvent.press(screen.getByText("Save"));

    expect(onSave).not.toHaveBeenCalled();
  });

  it("shows validation errors when save fails", () => {
    mockValidate.mockReturnValue({
      valid: false,
      errors: {
        title: "Title cannot be empty.",
        date: "Date must be within the next 6 months.",
      },
    });

    renderScreen(<EditHolidayModal {...defaultProps} />);

    fireEvent.press(screen.getByText("Save"));

    expect(screen.getByText("Title cannot be empty.")).toBeTruthy();
    expect(
      screen.getByText("Date must be within the next 6 months."),
    ).toBeTruthy();
  });

  it("clears the title error when the user types", () => {
    mockValidate.mockReturnValue({
      valid: false,
      errors: { title: "Title cannot be empty." },
    });

    renderScreen(<EditHolidayModal {...defaultProps} />);

    fireEvent.press(screen.getByText("Save"));
    expect(screen.getByText("Title cannot be empty.")).toBeTruthy();

    fireEvent.changeText(screen.getByDisplayValue("Good Friday"), "New Title");

    expect(screen.queryByText("Title cannot be empty.")).toBeNull();
  });

  it("clears the date error when the user types", () => {
    mockValidate.mockReturnValue({
      valid: false,
      errors: { date: "Please enter a valid date." },
    });

    renderScreen(<EditHolidayModal {...defaultProps} />);

    fireEvent.press(screen.getByText("Save"));
    expect(screen.getByText("Please enter a valid date.")).toBeTruthy();

    fireEvent.changeText(screen.getByDisplayValue("2026-04-03"), "2026-05-01");

    expect(screen.queryByText("Please enter a valid date.")).toBeNull();
  });

  it("calls onClose when Cancel is pressed", () => {
    const onClose = jest.fn();

    renderScreen(<EditHolidayModal {...defaultProps} onClose={onClose} />);

    fireEvent.press(screen.getByText("Cancel"));

    expect(onClose).toHaveBeenCalled();
  });

  it("passes edited values to onSave", () => {
    const onSave = jest.fn();

    renderScreen(<EditHolidayModal {...defaultProps} onSave={onSave} />);

    fireEvent.changeText(screen.getByDisplayValue("Good Friday"), "May Day");
    fireEvent.changeText(screen.getByDisplayValue("2026-04-03"), "2026-05-04");
    fireEvent.changeText(
      screen.getByPlaceholderText("Optional notes"),
      "Edited note",
    );
    fireEvent.press(screen.getByText("Save"));

    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "May Day",
        date: "2026-05-04",
        notes: "Edited note",
      }),
    );
  });
});
