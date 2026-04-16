export function meshShift(grid, R, C, q) {
  const P = R * C;
  q = q % P;

  const rowShift = q % C;
  const colShift = Math.floor(q / C);

  // Stage 1: Row Shift
  let afterRow = grid.map(row =>
    row.map((_, c) => row[(c - rowShift + C) % C])
  );

  // Stage 2: Column Shift
  let afterCol = Array.from({ length: R }, (_, r) =>
    Array.from({ length: C }, (_, c) =>
      afterRow[(r - colShift + R) % R][c]
    )
  );

  return { afterRow, afterCol, rowShift, colShift };
}