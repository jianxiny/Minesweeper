import { useState } from 'react'
import {
  beginnerLevel,
  GameSettings,
  LevelNames,
  Settings
} from '../game/GameSettings'

interface Return {
  settings: Settings
  level: LevelNames
  setLevel: (level: LevelNames) => Settings
}

export const useSettings = (gamelevel: LevelNames = beginnerLevel): Return => {
  const [level, setLevel] = useState<LevelNames>(gamelevel)
  // get game settigns
  const settings = GameSettings[level]
  return {
    settings,
    level,
    setLevel: (level: LevelNames) => {
      setLevel(level)
      return GameSettings[level]
    }
  }
}
