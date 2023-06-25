import { render, screen } from "@testing-library/react";
import { expect } from "@jest/globals"; // Import expect from @jest/globals
import "@testing-library/jest-dom"; // Import @testing-library/jest-dom for additional matchers
import Greeting from "./Greeting";

describe("Greeting Component", () => {
  test("renders Hellow world as text", () => {
    //Arange
    render(<Greeting />);

    //Act
    // nothing

    //Assert
    const helloWorld = screen.getByText("Hello World!");
    expect(helloWorld).toBeInTheDocument();
  });
});
