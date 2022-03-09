import { FC } from 'react'
import { Grid } from './Grid'
import { Scoreboard } from './Scoreboard'
import { GameOver } from './GameOver'

export const GameWithReactRedux: FC = () => {
  return (
    <>
      <Scoreboard />
      <GameOver />
      <Grid />
    </>
  )
}
