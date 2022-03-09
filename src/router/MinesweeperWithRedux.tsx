import { FC } from 'react'
import { GameLayout } from '../core/GameLayout'
import { Top } from '../core/top'
import { GameWithReactRedux } from '../game/GameWithRedux/GameWithRedux'

const MinesweeperWithReactRedux: FC = () => {
  return (
    <GameLayout
      top={
        <Top feature="Flag" firstAction="right click">
          Minesweeper with ReactRedux special for you
        </Top>
      }
    >
      <GameWithReactRedux />
    </GameLayout>
  )
}

export default MinesweeperWithReactRedux
