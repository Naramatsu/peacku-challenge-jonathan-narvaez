/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { render, screen } from "@testing-library/react";
import Puzzle from "./Puzzle";

describe("App Component", () => {
  const initialPuzzle = [
    ["D", "E", "Y", "Q", "A", "U", "G"],
    ["X", "R", "G", "T", "U", "A", "V"],
    ["S", "C", "A", "S", "A", "B", "E"],
    ["X", "A", "J", "G", "U", "H", "V"],
    ["F", "M", "O", "R", "O", "L", "B"],
    ["G", "A", "H", "J", "E", "N", "E"],
  ];
  const ComponentWrapped = (props = {}) =>
    render(
      <Puzzle
        txtSearch={""}
        setTxtSearch={() => jest.fn()}
        matcher={() => jest.fn()}
        message={""}
        puzzle={initialPuzzle}
        pointsDrawed={props.pointsDrawed || []}
      />
    );
  it("Should renders App Title", () => {
    ComponentWrapped();
    const title = screen.getByText(/Search box/i);
    expect(title).toBeInTheDocument();
  });
});
