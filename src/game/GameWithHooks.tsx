import { FC, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { GameOver } from './GameOver'
import { GameLevels, LevelNames } from './GameSettings'
import { Grid } from './Grid'
import { Scoreboard } from './Scoreboard'
import { useGame } from './useGame'

export const GameWithHooks: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  // the only source true of level if from url
  const urlLevelParam = (searchParams.get('level') || undefined) as LevelNames

  const {
    level,
    time,
    isGameOver,
    isWin,
    settings,
    playerField,
    flagCounter,
    onClick,
    onContextMenu,
    onChangeLevel,
    onReset
  } = useGame(urlLevelParam)

  const [, bombs] = settings

  const onChangeLevelHandler = useCallback(
    ({ target: { value: level } }: React.ChangeEvent<HTMLSelectElement>) => {
      setSearchParams({ level })
      onChangeLevel(level as LevelNames)
    },
    []
  )

  return (
    <>
      <Scoreboard
        time={String(time)}
        bombs={String(bombs - flagCounter)}
        levels={GameLevels as unknown as string[]}
        defaultLevel={level}
        onChangeLevel={onChangeLevelHandler}
        onReset={onReset}
      />
      {isGameOver && <GameOver onClick={onReset} isWin={isWin} />}
      <Grid onClick={onClick} onContextMenu={onContextMenu}>
        {playerField}
      </Grid>
    </>
  )
}
