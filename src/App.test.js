/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { fireEvent, render, screen, within } from "@testing-library/react";
import App from "./App";
import AppState from "./context/AppState";
import userEvent from "@testing-library/user-event";

describe("App Component", () => {
  const ComponentWrapped = () =>
    render(
      <AppState>
        <App />
      </AppState>
    );

  it("Should renders App Title", () => {
    ComponentWrapped();
    const title = screen.getByText(/Word Puzzle/i);
    expect(title).toBeInTheDocument();
  });

  it("Should renders Search box", () => {
    ComponentWrapped();
    const searchBox = screen.getByText(/Search Box/i);
    expect(searchBox).toBeInTheDocument();
  });

  it("Should renders Attempts", () => {
    ComponentWrapped();
    const attempts = screen.getByText(/Attempts/i);
    expect(attempts).toBeInTheDocument();
  });

  describe("Theme Section", () => {
    it("Should renders Toggle component", () => {
      const { container } = ComponentWrapped();
      const toggle = container.querySelector(".kromac-toggle");
      expect(toggle).toBeInTheDocument();
    });

    it("Theme should be light", () => {
      const { container } = ComponentWrapped();
      const light = container.querySelector(".light");
      const dark = container.querySelector(".dark");
      expect(light).toBeInTheDocument();
      expect(dark).not.toBeInTheDocument();
    });

    it("Should set to Dark theme", async () => {
      const { container } = ComponentWrapped();
      const toggle = within(container.querySelector(".kromac-checkbox"));
      const input = toggle.getByRole("checkbox");
      await userEvent.click(input);
      const dark = container.querySelector(".dark");
      const light = container.querySelector(".light");
      expect(dark).toBeInTheDocument();
      expect(light).not.toBeInTheDocument();
    });

    it("Should set to Light theme", async () => {
      const { container } = ComponentWrapped();
      const toggle = within(container.querySelector(".kromac-checkbox"));
      const input = toggle.getByRole("checkbox");
      await userEvent.click(input);
      const dark = container.querySelector(".dark");
      const light = container.querySelector(".light");
      expect(dark).not.toBeInTheDocument();
      expect(light).toBeInTheDocument();
    });
  });

  describe("Modal Component", () => {
    it("Should not renders Modal component", () => {
      const { container } = ComponentWrapped();
      const modal = container.querySelector(".modal");
      expect(modal).not.toBeInTheDocument();
    });

    it("Should renders Modal component", async () => {
      const { container } = ComponentWrapped();
      await userEvent.click(screen.getByText("Set Puzzle"));
      const modal = container.querySelector(".modal");
      expect(modal).toBeInTheDocument();
    });

    it("Should hide Modal component", async () => {
      const { container } = ComponentWrapped();
      await userEvent.click(screen.getByText("Set Puzzle"));
      await userEvent.click(container.querySelector(".close__icon"));
      const modal = container.querySelector(".modal");
      expect(modal).not.toBeInTheDocument();
    });
  });

  it("handler reset envent", async () => {
    const { container } = ComponentWrapped();
    const reloadIcon = container.querySelector(".reload__icon");
    await userEvent.click(reloadIcon);
    const items = container.getElementsByTagName("li");
    expect(items.length).toBe(0);
  });

  describe("Matcher function", () => {
    it("Should not match the word", async () => {
      const { container } = ComponentWrapped();
      const section = within(
        container.querySelector(".search__section__input")
      );
      const input = section.getByRole("textbox");
      await fireEvent.change(input, { target: { value: "some" } });
      await userEvent.click(screen.getByText(/Send/i));
      const errorMessage = container.querySelector(".error__message");
      expect(errorMessage).toBeInTheDocument();
    });

    it("Should match the word", async () => {
      const { container } = ComponentWrapped();
      const section = within(
        container.querySelector(".search__section__input")
      );
      const input = section.getByRole("textbox");
      await fireEvent.change(input, { target: { value: "dragon" } });
      await userEvent.click(screen.getByText(/Send/i));
      const errorMessage = container.querySelector(".error__message");
      expect(errorMessage).not.toBeInTheDocument();
      const itemAdded = screen.getByText(/DRAGON/i);
      expect(itemAdded).toBeInTheDocument();
    });
  });
});
