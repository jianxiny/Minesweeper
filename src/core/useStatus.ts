import { useState } from 'react'

export interface GameManager {
  isGameOver: boolean
  isGameStarted: boolean
  isWin: boolean

  setGameWin: () => void
  setGameLoose: () => void
  setInProgress: () => void
  setNewGame: () => void
}

export enum GameStatus {
  NewGame, // new game waiting to inprogress(not started)
  InProgress,
  Win,
  Loose
}

export const useStatus = (): GameManager => {
  const [isGameOver, setIsGameOver] = useState(false)
  const [isWin, setIsWin] = useState(false)
  const [isGameStarted, setIsGameStarted] = useState(false)

  const setGameStatus = (status: GameStatus) => {
    setIsGameStarted(status === GameStatus.InProgress)
    setIsWin(status === GameStatus.Win)
    setIsGameOver([GameStatus.Win, GameStatus.Loose].includes(status))
  }

  const setNewGame = () => setGameStatus(GameStatus.NewGame)
  const setInProgress = () => setGameStatus(GameStatus.InProgress)
  const setGameWin = () => setGameStatus(GameStatus.Win)
  const setGameLoose = () => setGameStatus(GameStatus.Loose)

  return {
    isGameOver,
    isGameStarted,
    isWin,
    setNewGame,
    setInProgress,
    setGameLoose,
    setGameWin
  }
}
