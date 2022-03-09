import { CellState, Field } from './Field'

export const detectSolvedPuzzle = (
  playerField: Field,
  gameField: Field
): [boolean, number] => {
  let bombsCounter = 0
  let flagCounter = 0
  let detectedBombsCounter = 0
  let isFieldHaveHiddenCells = false

  gameField.forEach((col, rowNum) => {
    col.forEach((cell, colNum) => {
      const gameCell = cell
      const playerCell = playerField[rowNum][colNum]

      const isPlayerCellFlag = [CellState.flag, CellState.weakFlag].includes(
        playerCell
      )

      if (playerCell === CellState.hidden) {
        isFieldHaveHiddenCells = true
      }

      if (isPlayerCellFlag) {
        flagCounter++
      }

      if (gameCell === CellState.bomb) {
        bombsCounter++
        if (isPlayerCellFlag) {
          detectedBombsCounter++
        }
      }
    })
  })

  const isPuzzleSolved =
    bombsCounter === detectedBombsCounter &&
    flagCounter === bombsCounter &&
    !isFieldHaveHiddenCells

  return [isPuzzleSolved, flagCounter]
}
