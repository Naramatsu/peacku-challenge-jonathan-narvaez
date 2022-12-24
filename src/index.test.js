import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import AppState from "./context/AppState";

describe("renders react component", () => {
  const ComponentWrapped = () =>
    render(
      <AppState>
        <App />
      </AppState>
    );

  it("should mount the App component", () => {
    ComponentWrapped();
    const title = screen.getByText(/Word Puzzle/i);
    expect(title).toBeInTheDocument();
  });
});
