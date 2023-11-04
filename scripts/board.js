const board = document.getElementById("puzzle");
const solveButton = document.getElementById("solve");
const clearButton = document.getElementById("clear");

// Create an empty 9x9 Sudoku grid
let grid = Array.from({ length: 9 }, () => Array(9).fill(0));

// Function to display the Sudoku grid
function displayGrid() {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cellValue = grid[row][col];
            const cell = board.querySelector(`#cell-${row}-${col}`);
            cell.value = cellValue === 0 ? "" : cellValue;
        }
    }
}

// Event listener for solving the Sudoku
solveButton.addEventListener("click", () => {
    if (solveSudoku(grid)) {
        displayGrid();
    } else {
        alert("No solution found for the current puzzle.");
    }
});

// Event listener for clearing the puzzle
clearButton.addEventListener("click", () => {
    grid = Array.from({ length: 9 }, () => Array(9).fill(0));
    displayGrid();
});

// Create the initial cells for the puzzle
for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
        let cell = document.createElement("input");
        cell.id = `cell-${row}-${col}`;
        cell.className = "cellClass";
        cell.type = "number";

        // Add an event listener to update the grid when the user inputs a number
        cell.addEventListener("input", () => {
            const value = parseInt(cell.value);
            if (!isNaN(value)) {
                grid[row][col] = value;
            } else {
                grid[row][col] = 0;
            }
        });

        board.appendChild(cell);
    }
}

// for (let row = 0; row < 9; row++) {
//     for (let col = 0; col < 9; col++) {
//         let cell = document.createElement("input");
//         cell.id = `cell-${row}-${col}`;
//         cell.className = "cellClass";
//         cell.type = "number";
//
//         // Calculate margins for creating gaps between 3x3 sections
//         let margin = "0px";
//         if (row % 3 === 2) {
//             margin += "0px 0px 6px 0px";
//         }
//         if (col % 3 === 2) {
//             margin += "0px 6px 0px 0px";
//         }
//         cell.style.margin = margin;
//
//         // Add an event listener to update the grid when the user inputs a number
//         cell.addEventListener("input", () => {
//             const value = parseInt(cell.value);
//             if (!isNaN(value)) {
//                 grid[row][col] = value;
//             } else {
//                 grid[row][col] = 0;
//             }
//         });
//
//         board.appendChild(cell);
//     }
// }

// Function to solve the Sudoku puzzle using backtracking
function solveSudoku(grid) {
    const emptyCell = findEmptyCell(grid);

    // If there are no empty cells, the puzzle is solved
    if (!emptyCell) {
        return true;
    }

    const [row, col] = emptyCell;

    // Try placing a number from 1 to 9 in the empty cell
    for (let num = 1; num <= 9; num++) {
        if (isValidMove(grid, row, col, num)) {
            grid[row][col] = num;

            if (solveSudoku(grid)) {
                return true;
            }

            // If the current configuration doesn't lead to a solution, backtrack
            grid[row][col] = 0;
        }
    }

    // If no number can be placed, backtrack further
    return false;
}

// Function to find an empty cell in the grid
function findEmptyCell(grid) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] === 0) {
                return [row, col];
            }
        }
    }
    return null;
}

// Function to check if a number can be placed in a cell
function isValidMove(grid, row, col, num) {
    // Check if the number is already in the row or column
    for (let i = 0; i < 9; i++) {
        if (grid[row][i] === num || grid[i][col] === num) {
            return false;
        }
    }

    // Check if the number is already in the 3x3 grid
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[startRow + i][startCol + j] === num) {
                return false;
            }
        }
    }

    return true;
}




