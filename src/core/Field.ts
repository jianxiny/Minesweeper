import { incrementNeibours } from './CellsManipulator'

export type Cell = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
export type Field = Cell[][]
export type Coords = [number, number]

// i think enum is a better choice
export const CellState: Record<
  'empty' | 'bomb' | 'hidden' | 'flag' | 'weakFlag',
  Cell
> = {
  empty: 0,
  bomb: 9,
  hidden: 10,
  flag: 11,
  weakFlag: 12
}

export const generateFieldWithDefaultState = (
  size: number,
  state: Cell = CellState.empty
) => new Array(size).fill(null).map(() => new Array(size).fill(state))

export const fieldGenerator = (size: number, probability: number): Field => {
  if (probability < 0 || probability > 1) {
    throw new Error('Probability must be between 0 and 1')
  }

  let unprocesseCell = size * size
  let restCellsWithBombs = unprocesseCell * probability

  const res: Field = generateFieldWithDefaultState(size)

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (restCellsWithBombs / unprocesseCell > Math.random()) {
        res[y][x] = CellState.bomb
        incrementNeibours([y, x], res)
        restCellsWithBombs--
      }
      unprocesseCell--
    }
  }
  return res
}
