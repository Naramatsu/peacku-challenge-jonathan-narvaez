/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { render, screen } from "@testing-library/react";
import Attempts from "./Attempts";

describe("App Component", () => {
  const ComponentWrapped = (attempts) =>
    render(
      <Attempts handlerReset={() => jest.fn()} attempts={attempts || []} />
    );

  it("Should renders Attempts title", () => {
    ComponentWrapped();
    const title = screen.getByText(/Attempts/i);
    expect(title).toBeInTheDocument();
  });

  describe("Should renders an attempts list", () => {
    const attempts = [
      { word: "some valid", isValid: true },
      { word: "some invalid", isValid: false },
    ];
    it("Should render only a valid words", () => {
      const { container } = ComponentWrapped([attempts[0]]);
      const itemValid = screen.getByText(/some valid/i);
      const validClass = container.querySelector(".valid");
      const invalidClass = container.querySelector(".invalid");
      expect(itemValid).toBeInTheDocument();
      expect(validClass).toBeInTheDocument();
      expect(invalidClass).not.toBeInTheDocument();
    });

    it("Should render only a invalid words", () => {
      const { container } = ComponentWrapped([attempts[1]]);
      const itemInValid = screen.getByText(/some invalid/i);
      const invalidClass = container.querySelector(".invalid");
      const validClass = container.querySelector(".valid");
      expect(itemInValid).toBeInTheDocument();
      expect(invalidClass).toBeInTheDocument();
      expect(validClass).not.toBeInTheDocument();
    });

    it("Should render valid and invalid words list", () => {
      const { container } = ComponentWrapped(attempts);
      const itemValid = screen.getByText(/some valid/i);
      const itemInValid = screen.getByText(/some invalid/i);
      const invalidClass = container.querySelector(".invalid");
      const validClass = container.querySelector(".valid");
      expect(itemInValid).toBeInTheDocument();
      expect(invalidClass).toBeInTheDocument();
      expect(itemValid).toBeInTheDocument();
      expect(validClass).toBeInTheDocument();
    });
  });
});
