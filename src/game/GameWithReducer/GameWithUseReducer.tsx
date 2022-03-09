import { FC, useCallback, useReducer } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Coords } from '../../core/Field'
import { useTime } from '../../core/useTime'
import { GameOver } from '../GameOver'
import { GameLevels, LevelNames } from '../GameSettings'
import { Grid } from '../Grid'
import { Scoreboard } from '../Scoreboard'
import { actions, getInitialState, reducer, runTimer } from './store/reducer'

export const GameWithUseReducer: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const urlLevelParam = (searchParams.get('level') || undefined) as LevelNames
  const [
    {
      level,
      isGameOver,
      isGameStarted,
      isWin,
      settings,
      playerField,
      flagCounter
    },
    dispatch
  ] = useReducer(reducer, getInitialState(urlLevelParam))

  const [, bombs] = settings
  const [time, onReset] = useTime(isGameStarted, isGameOver)

  const onClick = useCallback((coords: Coords) => {
    dispatch(actions.openCell(coords))
  }, [])

  const onContextMenu = useCallback(
    (coords: Coords) => dispatch(actions.setFlag(coords)),
    []
  )

  const onChangeLevel = useCallback(
    ({ target: { value: level } }: React.ChangeEvent<HTMLSelectElement>) => {
      setSearchParams({ level })
      dispatch(actions.changeLevel(level as LevelNames))
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
        onChangeLevel={onChangeLevel}
        onReset={onReset}
      />
      {isGameOver && <GameOver onClick={onReset} isWin={isWin} />}
      <Grid onClick={onClick} onContextMenu={onContextMenu}>
        {playerField}
      </Grid>
    </>
  )
}
