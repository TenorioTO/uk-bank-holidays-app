import { render, screen } from "@testing-library/react-native";
import Index from "../index";

describe("Index screen", () => {
  it("displays UK Bank Holidays text", () => {
    render(<Index />);

    expect(screen.getByText("UK Bank Holidays")).toBeTruthy();
  });
});
