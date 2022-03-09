import React, { FC, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Coords } from '../../core/Field'
import { actions, runTimer } from '../GameWithReducer/store/reducer'
import { Grid as GridComponent } from '../Grid'
import { RootState } from './store'

export const Grid: FC = () => {
  const { playerField } = useSelector(
    ({ game: { playerField } }: RootState) => ({
      playerField
    })
  )

  const dispatch = useDispatch()

  const onClick = useCallback((coords: Coords) => {
    dispatch(actions.openCell(coords))
    dispatch(runTimer())
  }, [])

  const onContextMenu = useCallback((coords: Coords) => {
    dispatch(actions.setFlag(coords))
    dispatch(runTimer())
  }, [])

  return (
    <GridComponent onClick={onClick} onContextMenu={onContextMenu}>
      {playerField}
    </GridComponent>
  )
}
