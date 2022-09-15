import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

describe(`${App.name} component`, () => {
  it("renders", () => {
    expect(() => render(<App />)).not.toThrow();
  });

  it("shows header", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: "Kokoushuoneiden varaussovellus" })
    ).toBeDefined();
  });
});
