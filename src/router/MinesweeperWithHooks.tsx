import { FC } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { GameLayout } from '../core/GameLayout'
import { Top } from '../core/top'
import { GameWithHooks } from '../game/GameWithHooks'

const MinesweeperWithHooks: FC = () => {
  const [searchParams] = useSearchParams()
  const { username } = useParams<{ username?: string }>()

  const id = searchParams.get('id')

  return (
    <GameLayout
      top={
        <Top feature="Flag" firstAction="right click">
          Minesweeper with ReactHooks special for you
          {username && `, ${username}`}
          {id && `; userId: ${id}`}
        </Top>
      }
    >
      <GameWithHooks />
    </GameLayout>
  )
}

export default MinesweeperWithHooks
