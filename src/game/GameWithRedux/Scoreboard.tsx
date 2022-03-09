import React, { FC, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { GameLevels, LevelNames } from '../GameSettings'
import { actions } from '../GameWithReducer/store/reducer'
import { Scoreboard as ScoreboardComponent } from '../Scoreboard'
import { RootState } from './store'

export const Scoreboard: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useDispatch()

  useEffect(() => {
    const urlLevelParam = (searchParams.get('level') || undefined) as LevelNames
    if (urlLevelParam) {
      dispatch(actions.changeLevel(urlLevelParam as LevelNames))
    }
  }, [])

  const { level, time, bombs, flagCounter } = useSelector(
    ({ game: { level, time, bombs, flagCounter } }: RootState) => ({
      level,
      time,
      bombs,
      flagCounter
    })
  )

  const onChangeLevel = useCallback(
    ({ target: { value: level } }: React.ChangeEvent<HTMLSelectElement>) => {
      setSearchParams({ level })
      dispatch(actions.changeLevel(level as LevelNames))
    },
    []
  )

  const onReset = useCallback(() => dispatch(actions.reset()), [])

  return (
    <ScoreboardComponent
      time={String(time)}
      bombs={String(bombs - flagCounter)}
      levels={GameLevels as unknown as string[]}
      defaultLevel={level}
      onChangeLevel={onChangeLevel}
      onReset={onReset}
    />
  )
}
