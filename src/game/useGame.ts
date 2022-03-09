import { useCallback, useState } from 'react'
import { convertToObject } from 'typescript'
import { checkNeighborValid, getNeigbors } from '../core/CellsManipulator'
import { detectSolvedPuzzle } from '../core/detectSolvedPuzzle'
import {
  CellState,
  Coords,
  Field,
  fieldGenerator,
  generateFieldWithDefaultState
} from '../core/Field'
import { setFlag } from '../core/setFlag'
import { useSettings } from '../core/useSetttings'
import { useStatus } from '../core/useStatus'
import { useTime } from '../core/useTime'
import { beginnerLevel, LevelNames, Settings } from './GameSettings'

interface ReturnType {
  level: LevelNames
  time: number
  isGameOver: boolean
  isGameStarted: boolean
  isWin: boolean
  settings: [number, number]
  playerField: Field
  gameField: Field
  flagCounter: number
  onClick: (coords: Coords) => void
  onContextMenu: (coords: Coords) => void
  onChangeLevel: (level: LevelNames) => void
  onReset: () => void
}

export const copyField = (field: Field): Field => field.map((row) => [...row])

export const openCellRecursively = (
  coords: Coords,
  playerField: Field,
  gameField: Field
): [Field, boolean] => {
  const [y, x] = coords

  const gameCell = gameField[y][x]
  const playerCell = playerField[y][x]

  if (gameCell === CellState.bomb) {
    throw new Error('Game Over')
  }

  if (playerCell === CellState.flag) {
    return [playerField, false]
  }

  playerField[y][x] = gameCell

  if (
    gameCell === CellState.empty &&
    [CellState.hidden, CellState.weakFlag].includes(playerCell)
  ) {
    const items = getNeigbors(coords)

    for (const [y, x] of Object.values(items)) {
      if (checkNeighborValid([y, x], gameField)) {
        ;[playerField] = openCellRecursively([y, x], playerField, gameField)
      }
    }
  }

  const [isSolved] = detectSolvedPuzzle(playerField, gameField)
  return [playerField, isSolved]
}

export const openCell = (
  coords: Coords,
  playerField: Field,
  gameField: Field
): [Field, boolean] => {
  return openCellRecursively(coords, copyField(playerField), gameField)
}

export const useGame = (gamelevel = beginnerLevel): ReturnType => {
  const {
    settings: [size, bombs],
    level,
    setLevel
  } = useSettings(gamelevel)

  const {
    isGameStarted,
    isWin,
    isGameOver,
    setNewGame,
    setInProgress,
    setGameWin,
    setGameLoose
  } = useStatus()

  const [time, resetTime] = useTime(isGameStarted, isGameOver)

  const [flagCounter, setFlagCounter] = useState(0)

  const [playerField, setPlayerField] = useState<Field>(
    generateFieldWithDefaultState(size, CellState.hidden)
  )

  const [gameField, setGameField] = useState<Field>(
    fieldGenerator(size, bombs / (size * size))
  )

  const onClick = useCallback(
    (coords: Coords) => {
      !isGameStarted && setInProgress()

      try {
        const [newPlayerField, isSolved] = openCell(
          coords,
          playerField,
          gameField
        )

        if (isSolved) {
          setGameWin()
        }
        setPlayerField([...newPlayerField])
      } catch (e) {
        setPlayerField([...gameField])
        setGameLoose()
      }
    },
    [
      isGameStarted,
      isGameOver,
      isWin,
      level,
      flagCounter,
      playerField,
      gameField
    ]
  )
  const onContextMenu = useCallback(
    (coords: Coords) => {
      !isGameStarted && setInProgress()

      const [newPlayerField, isSolved, newFlagCounter] = setFlag(
        coords,
        playerField,
        gameField,
        flagCounter,
        bombs
      )
      setFlagCounter(newFlagCounter)
      if (isSolved) {
        setGameWin()
      }
      setPlayerField([...newPlayerField])
    },
    [
      isGameStarted,
      isGameOver,
      isWin,
      level,
      flagCounter,
      playerField,
      gameField
    ]
  )

  const resetHandler = ([size, bombs]: Settings) => {
    const newGameField = fieldGenerator(size, bombs / (size * size))
    const newPlayerField = generateFieldWithDefaultState(size, CellState.hidden)

    setGameField([...newGameField])
    setPlayerField([...newPlayerField])
    setNewGame()
    resetTime()
    setFlagCounter(0)
  }

  const onChangeLevel = useCallback((level: LevelNames) => {
    const newSettings = setLevel(level)
    resetHandler(newSettings)
  }, [])

  const onReset = useCallback(() => resetHandler([size, bombs]), [size, bombs])

  return {
    level,
    time,
    isGameOver,
    isGameStarted,
    isWin,
    settings: [size, bombs],
    playerField,
    gameField,
    flagCounter,
    onClick,
    onContextMenu,
    onChangeLevel,
    onReset
  }
}
