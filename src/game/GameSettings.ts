export const beginnerLevel = 'beginner'
export const intermidateLevel = 'intermediate'
export const expertLevel = 'expert'

export const GameLevels = [beginnerLevel, intermidateLevel, expertLevel]

export type LevelNames = typeof GameLevels[number]

// the Field size and the bomb number
export type Settings = [number, number]

export const GameSettings: Record<LevelNames, Settings> = {
  beginner: [9, 10],
  intermediate: [16, 44],
  expert: [22, 99]
}
