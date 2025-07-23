// lib/generateMaze.ts

export type Cell = {
  x: number;
  y: number;
  visited: boolean;
  walls: [boolean, boolean, boolean, boolean];
};

export function generateMaze(cols: number, rows: number): Cell[][] {
  const grid: Cell[][] = [];
  for (let y = 0; y < rows; y++) {
    const row: Cell[] = [];
    for (let x = 0; x < cols; x++) {
      row.push({
        x,
        y,
        visited: false,
        walls: [true, true, true, true],
      });
    }
    grid.push(row);
  }

  function getNeighbors(cell: Cell) {
    const { x, y } = cell;
    const neighbors: { cell: Cell; dir: number }[] = [];

    const dirs = [
      [0, -1],
      [1, 0],
      [0, 1],
      [-1, 0],
    ];

    dirs.forEach(([dx, dy], dir) => {
      const nx = x + dx;
      const ny = y + dy;
      if (ny >= 0 && ny < rows && nx >= 0 && nx < cols) {
        const neighbor = grid[ny][nx];
        if (!neighbor.visited) {
          neighbors.push({ cell: neighbor, dir });
        }
      }
    });

    return neighbors;
  }

  function removeWalls(a: Cell, b: Cell, direction: number) {
    a.walls[direction] = false;
    b.walls[(direction + 2) % 4] = false;
  }

  function backtrack(cell: Cell) {
    cell.visited = true;
    const neighbors = getNeighbors(cell).sort(() => Math.random() - 0.5);
    for (const { cell: next, dir } of neighbors) {
      if (!next.visited) {
        removeWalls(cell, next, dir);
        backtrack(next);
      }
    }
  }

  backtrack(grid[0][0]);
  return grid;
}
