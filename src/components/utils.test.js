const { findWord, pathBuilder } = require("./utils");

const initialPuzzle = [
  ["D", "E", "Y", "Q", "A", "U", "G"],
  ["X", "R", "G", "T", "U", "A", "V"],
  ["S", "C", "A", "S", "A", "B", "E"],
  ["X", "A", "J", "G", "U", "H", "V"],
  ["F", "M", "O", "R", "O", "L", "B"],
  ["G", "A", "H", "J", "E", "N", "E"],
];

describe("FindWord function", () => {
  describe("Vertical words", () => {
    it("Should found edge point in Down path", () => {
      const expected = JSON.stringify({ start: [3, 2], end: [6, 2] });
      const result = JSON.stringify(findWord(initialPuzzle, "cama"));
      expect(result).toBe(expected);
    });

    it("Should found edge point in Up path", () => {
      const expected = JSON.stringify({ start: [6, 2], end: [3, 2] });
      const result = JSON.stringify(findWord(initialPuzzle, "amac"));
      expect(result).toBe(expected);
    });
  });

  describe("Horizontal words", () => {
    it("Should found edge point in Left path", () => {
      const expected = JSON.stringify({ start: [3, 2], end: [3, 5] });
      const result = JSON.stringify(findWord(initialPuzzle, "casa"));
      expect(result).toBe(expected);
    });

    it("Should found edge point in Right path", () => {
      const expected = JSON.stringify({ start: [3, 5], end: [3, 2] });
      const result = JSON.stringify(findWord(initialPuzzle, "asac"));
      expect(result).toBe(expected);
    });
  });

  describe("Diagonal words", () => {
    describe("Up path section", () => {
      it("Should found edge point in upLeft path", () => {
        const expected = JSON.stringify({ start: [6, 3], end: [4, 1] });
        const result = JSON.stringify(findWord(initialPuzzle, "hmx"));
        expect(result).toBe(expected);
      });

      it("Should found edge point in upRight path", () => {
        const expected = JSON.stringify({ start: [4, 3], end: [1, 6] });
        const result = JSON.stringify(findWord(initialPuzzle, "jsuu"));
        expect(result).toBe(expected);
      });
    });

    describe("Down path section", () => {
      it("Should found edge point in downLeft path", () => {
        const expected = JSON.stringify({ start: [1, 7], end: [6, 2] });
        const result = JSON.stringify(findWord(initialPuzzle, "gaagoa"));
        expect(result).toBe(expected);
      });

      it("Should found edges point in downRight path", () => {
        const expected = JSON.stringify({ start: [1, 1], end: [6, 6] });
        const result = JSON.stringify(findWord(initialPuzzle, "dragon"));
        expect(result).toBe(expected);
      });
    });
  });

  it("Should not found edges point", () => {
    const result = findWord(initialPuzzle, "asd");
    expect(result).toBeUndefined();
  });
});

describe("PathBuilder function", () => {
  describe("Horizonal path", () => {
    it("Case right path", () => {
      const start = [3, 2],
        end = [3, 5];
      const result = pathBuilder(start, end);
      const expected = [
        { col: 2, row: 3 },
        { col: 3, row: 3 },
        { col: 4, row: 3 },
        { col: 5, row: 3 },
      ];
      expect(result.sort()).toEqual(expected.sort());
    });

    it("Case left path", () => {
      const start = [3, 5],
        end = [3, 2];
      const result = pathBuilder(start, end);
      const expected = [
        { col: 5, row: 3 },
        { col: 4, row: 3 },
        { col: 3, row: 3 },
        { col: 2, row: 3 },
      ];
      expect(result.sort()).toEqual(expected.sort());
    });
  });

  describe("Vertical path", () => {
    it("Case up path", () => {
      const start = [6, 2],
        end = [3, 2];
      const result = pathBuilder(start, end);
      const expected = [
        { col: 2, row: 6 },
        { col: 2, row: 5 },
        { col: 2, row: 4 },
        { col: 2, row: 3 },
      ];
      expect(result.sort()).toEqual(expected.sort());
    });

    it("Case down path", () => {
      const start = [3, 2],
        end = [6, 2];
      const result = pathBuilder(start, end);
      const expected = [
        { col: 2, row: 3 },
        { col: 2, row: 4 },
        { col: 2, row: 5 },
        { col: 2, row: 6 },
      ];
      expect(result.sort()).toEqual(expected.sort());
    });
  });

  describe("Diagonal path", () => {
    describe("Case right", () => {
      it("Case down path", () => {
        const start = [1, 1],
          end = [4, 4];
        const result = pathBuilder(start, end);
        const expected = [
          { col: 1, row: 1 },
          { col: 2, row: 2 },
          { col: 3, row: 3 },
          { col: 4, row: 4 },
        ];
        expect(result.sort()).toEqual(expected.sort());
      });

      it("Case up path", () => {
        const start = [1, 4],
          end = [4, 1];
        const result = pathBuilder(start, end);
        const expected = [
          { col: 4, row: 1 },
          { col: 3, row: 2 },
          { col: 2, row: 3 },
          { col: 1, row: 4 },
        ];
        expect(result.sort()).toEqual(expected.sort());
      });
    });

    describe("Case left", () => {
      it("Case down path", () => {
        const start = [4, 1],
          end = [1, 4];
        const result = pathBuilder(start, end);
        const expected = [
          { col: 1, row: 4 },
          { col: 2, row: 3 },
          { col: 3, row: 2 },
          { col: 4, row: 1 },
        ];
        expect(result.sort()).toEqual(expected.sort());
      });
      it("Case up path", () => {
        const start = [4, 4],
          end = [1, 1];
        const result = pathBuilder(start, end);
        const expected = [
          { col: 4, row: 4 },
          { col: 3, row: 3 },
          { col: 2, row: 2 },
          { col: 1, row: 1 },
        ];
        expect(result.sort()).toEqual(expected.sort());
      });
    });
  });
});
