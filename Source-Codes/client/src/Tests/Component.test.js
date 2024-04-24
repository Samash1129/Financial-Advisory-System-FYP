import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Dropdown from "../Components/Dropdown";
import { cleanup } from "@testing-library/react";

describe("Dropdown", () => {
  const options = ["Option 1", "Option 2", "Option 3"];
  const onOptionSelect = jest.fn();

  beforeEach(() => {
    render(<Dropdown options={options} onOptionSelect={onOptionSelect} />);
  });

  test("renders dropdown header with default text", () => {
    const dropdownHeader = screen.getByText("Choose your desired option");
    expect(dropdownHeader).toBeInTheDocument();
  });

  test("opens dropdown list when header is clicked", () => {
    const dropdownHeader = screen.getByText("Choose your desired option");
    fireEvent.click(dropdownHeader);

    const dropdownList = screen.getByRole("list");
    expect(dropdownList).toBeInTheDocument();
  });

  afterEach(cleanup);

  test("closes dropdown list when clicked outside", () => {
    // Render a wrapper component that includes both the Dropdown and the outside element
    const { container } = render(
      <div>
        <Dropdown options={options} onOptionSelect={onOptionSelect} />
        <div>Outside Element</div>
      </div>
    );

    const dropdownHeader = container.querySelector(".dropdownHeader");
    fireEvent.click(dropdownHeader);

    const outsideElement = screen.getByText("Outside Element");
    fireEvent.click(outsideElement);

    const dropdownList = container.querySelector(".dropdownList");
    expect(dropdownList).toBeNull();
  });

  test("calls onOptionSelect callback when an option is clicked", () => {
    const dropdownHeader = screen.getByText("Choose your desired option");
    fireEvent.click(dropdownHeader);

    const option1 = screen.getByText("Option 1");
    fireEvent.click(option1);

    expect(onOptionSelect).toHaveBeenCalledWith("Option 1");
  });
});
