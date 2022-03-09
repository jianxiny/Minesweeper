import React, { FC, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GameOver as GameOverComponent } from '../GameOver'
import { actions } from '../GameWithReducer/store/reducer'
import { RootState } from './store'

export const GameOver: FC = () => {
  const { isGameOver, isWin } = useSelector(
    ({ game: { isGameOver, isWin } }: RootState) => ({
      isGameOver,
      isWin
    })
  )

  const dispatch = useDispatch()

  const onReset = useCallback(() => dispatch(actions.reset()), [])

  return (
    <>{isGameOver && <GameOverComponent onClick={onReset} isWin={isWin} />}</>
  )
}
