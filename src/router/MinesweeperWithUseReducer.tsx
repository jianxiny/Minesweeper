import { FC } from 'react'
import { GameLayout } from '../core/GameLayout'
import { Top } from '../core/top'
import { GameWithUseReducer } from '../game/GameWithReducer/GameWithUseReducer'

const MinesweeperWithUseReducer: FC = () => {
  return (
    <GameLayout
      top={
        <Top feature="Flag" firstAction="right click">
          Minesweeper with React+Redux and useReducer special for you
        </Top>
      }
    >
      <GameWithUseReducer />
    </GameLayout>
  )
}

export default MinesweeperWithUseReducer
