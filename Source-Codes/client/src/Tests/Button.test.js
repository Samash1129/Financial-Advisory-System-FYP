import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import Buttons from "../Components/Button";

describe("Buttons", () => {
  test("renders button with correct text", () => {
    const buttonText = "Click me";
    render(<Buttons text={buttonText} />);
    const buttonElement = screen.getByText(buttonText);
    expect(buttonElement).toBeInTheDocument();
  });

  test("calls onClick function when button is clicked", () => {
    const onClickMock = jest.fn();
    render(<Buttons text="Click me" onClick={onClickMock} />);
    const buttonElement = screen.getByText("Click me");
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalled();
  });
});