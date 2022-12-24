/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { fireEvent, render, screen, within } from "@testing-library/react";
import AppState from "../../context/AppState";
import userEvent from "@testing-library/user-event";
import ModalToSetPuzzle from "./ModalToSetPuzzle";

describe("App Component", () => {
  const ComponentWrapped = (attempts) =>
    render(
      <AppState>
        <ModalToSetPuzzle
          handlerPuzzle={() => jest.fn()}
          onClose={() => jest.fn()}
        />
      </AppState>
    );

  it("Should renders Modal title", () => {
    ComponentWrapped();
    const title = screen.getByText(/Please insert the pusle/i);
    expect(title).toBeInTheDocument();
  });

  it("Should update textarea value", async () => {
    const { container } = ComponentWrapped();
    const textarea = container.querySelector(".textarea");
    await fireEvent.change(textarea, { target: { value: "A,B,C" } });
    expect(textarea.value).toBe("A,B,C");
  });

  describe("Validate", () => {
    it("Should show a error message when the input is empty", async () => {
      const { container } = ComponentWrapped();
      const textarea = container.querySelector(".textarea");
      await fireEvent.change(textarea, { target: { value: "" } });
      const kromacbuton = within(container.querySelector(".btn__set__puzzle"));
      const button = kromacbuton.getByText(/Set Puzzle/i);
      await userEvent.click(button);
      const message = screen.getByText(/Please insert a valid puzzle/i);
      expect(message).toBeInTheDocument();
    });

    it("Should show a error message when the rows does not have the same number of characters", async () => {
      const value = `D,E,Y,Q,A,U,G
X,R,G,T,U`;
      const { container } = ComponentWrapped();
      const textarea = container.querySelector(".textarea");
      await fireEvent.change(textarea, { target: { value } });
      const kromacbuton = within(container.querySelector(".btn__set__puzzle"));
      const button = kromacbuton.getByText(/Set Puzzle/i);
      await userEvent.click(button);
      const message = screen.getByText(
        /Please insert a valid puzzle, All the rows must hace the same number of characters/i
      );
      expect(message).toBeInTheDocument();
    });
  });

  it("Should show pass all validations", async () => {
    const value = `D,E,Y,Q,A,U,G
X,R,G,T,U,A,V
S,C,A,S,A,B,E
X,A,J,G,U,H,V
F,M,O,R,O,L,B
G,A,H,J,E,N,E`;
    const { container } = ComponentWrapped();
    const textarea = container.querySelector(".textarea");
    await fireEvent.change(textarea, { target: { value } });
    const kromacbuton = within(container.querySelector(".btn__set__puzzle"));
    const button = kromacbuton.getByText(/Set Puzzle/i);
    await userEvent.click(button);
    const errorClass = container.querySelector(".error__message");
    expect(errorClass).not.toBeInTheDocument();
  });
});
