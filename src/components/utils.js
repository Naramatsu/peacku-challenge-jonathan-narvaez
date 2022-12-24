export const findWord = (puzzle, word) => {
  let result = undefined;
  puzzle.forEach((rows, rowIndex) => {
    rows.forEach((_, colIndex) => {
      if (puzzle[rowIndex][colIndex].toUpperCase() === word[0].toUpperCase()) {
        const directions = getPossibleDirection(
          word[1].toUpperCase(),
          rowIndex,
          colIndex,
          puzzle
        );
        for (const direction of directions) {
          const end = findEndPoint(word, rowIndex, colIndex, direction, puzzle);
          if (end) {
            result = {
              start: [rowIndex + 1, colIndex + 1],
              end: [end[0] + 1, end[1] + 1],
            };
          }
        }
      }
    });
  });
  return result;
};

const getPossibleDirection = (referencedWord, rows, cols, puzzle) => {
  const possibleDirection = [];
  if (rows > 0) {
    if (puzzle[rows - 1][cols - 1] === referencedWord)
      possibleDirection.push("upLeft");
    if (puzzle[rows - 1][cols] === referencedWord) possibleDirection.push("up");
    if (puzzle[rows - 1][cols + 1] === referencedWord)
      possibleDirection.push("upRight");
  }
  if (puzzle[rows][cols - 1] === referencedWord) possibleDirection.push("left");
  if (puzzle[rows][cols + 1] === referencedWord)
    possibleDirection.push("right");
  if (rows + 1 < puzzle.length) {
    if (puzzle[rows + 1][cols - 1] === referencedWord)
      possibleDirection.push("downLeft");
    if (puzzle[rows + 1][cols] === referencedWord)
      possibleDirection.push("down");
    if (puzzle[rows + 1][cols + 1] === referencedWord)
      possibleDirection.push("downRight");
  }
  return possibleDirection;
};

const findEndPoint = (word, rows, cols, directionSearch, puzzle) => {
  let end = null;
  if (!haveLength(rows, cols, puzzle)) return null;

  if (puzzle[rows][cols].toUpperCase() === word[0].toUpperCase()) {
    if (word.length === 1) return [rows, cols];

    word = word.slice(1);

    switch (directionSearch) {
      case "upLeft":
        end = findEndPoint(word, rows - 1, cols - 1, directionSearch, puzzle);
        if (end) return end;
        break;
      case "up":
        end = findEndPoint(word, rows - 1, cols, directionSearch, puzzle);
        if (end) return end;
        break;
      case "upRight":
        end = findEndPoint(word, rows - 1, cols + 1, directionSearch, puzzle);
        if (end) return end;
        break;
      case "left":
        end = findEndPoint(word, rows, cols - 1, directionSearch, puzzle);
        if (end) return end;
        break;
      case "right":
        end = findEndPoint(word, rows, cols + 1, directionSearch, puzzle);
        if (end) return end;
        break;
      case "downLeft":
        end = findEndPoint(word, rows + 1, cols - 1, directionSearch, puzzle);
        if (end) return end;
        break;
      case "down":
        end = findEndPoint(word, rows + 1, cols, directionSearch, puzzle);
        if (end) return end;
        break;
      case "downRight":
        end = findEndPoint(word, rows + 1, cols + 1, directionSearch, puzzle);
        if (end) return end;
        break;
      default:
        break;
    }
  }
  return end;
};

const haveLength = (rows, cols, puzzle) => {
  if (
    rows < 0 ||
    rows >= puzzle.length ||
    cols < 0 ||
    cols >= puzzle[rows].length
  ) {
    return false;
  }
  return true;
};

export const pathBuilder = (start, end) => {
  const result = [];
  if (start[0] === end[0]) {
    if (start[1] < end[1]) {
      for (let i = start[1]; i <= end[1]; i++) {
        result.push({ row: start[0], col: i });
      }
    } else {
      for (let i = start[1]; i >= end[1]; i--) {
        result.push({ row: start[0], col: i });
      }
    }
  }
  if (start[1] === end[1]) {
    if (start[0] < end[0]) {
      for (let i = start[0]; i <= end[0]; i++) {
        result.push({ row: i, col: start[1] });
      }
    } else {
      for (let i = start[0]; i >= end[0]; i--) {
        result.push({ row: i, col: start[1] });
      }
    }
  }
  if (start[0] !== end[0] && start[1] !== end[1]) {
    if (start[0] < end[0]) {
      let col = start[1];
      for (let row = start[0]; row <= end[0]; row++) {
        result.push({ row, col });
        if (start[1] < end[1]) {
          col++;
        } else {
          col--;
        }
      }
    } else {
      let col = start[1];
      for (let row = start[0]; row >= end[0]; row--) {
        result.push({ row, col });
        if (start[1] < end[1]) {
          col++;
        } else {
          col--;
        }
      }
    }
  }
  return result;
};
