import React, { FC, Suspense } from 'react'
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useSearchParams
} from 'react-router-dom'

import { Provider } from 'react-redux'
import { store } from './game/GameWithRedux/store'

const MinesweeperWithHooks = React.lazy(
  () => import('./router/MinesweeperWithHooks')
)

const MinesweeperWithUseReducer = React.lazy(
  () => import('./router/MinesweeperWithUseReducer')
)

const MinesweeperWithReactRedux = React.lazy(
  () => import('./router/MinesweeperWithRedux')
)
export const Navigation: FC = () => {
  const [searchParams] = useSearchParams()
  const level = searchParams.get('level') || ''

  const getLocationObjWithSearchParams = (
    pathname: string
  ): Partial<Location> => ({
    pathname,
    search: `${
      level &&
      `?${new URLSearchParams({
        level
      }).toString()}`
    }`
  })

  return (
    <nav>
      <ul>
        <li>
          <Link to={getLocationObjWithSearchParams('/')}>Home</Link>
        </li>
        <li>
          <Link to={getLocationObjWithSearchParams('/minesweeper/hooks')}>
            Game With Hooks
          </Link>
        </li>
        <li>
          <Link to={getLocationObjWithSearchParams('/minesweeper/usereducer')}>
            Game With useReducer
          </Link>
        </li>
        <li>
          <Link to={getLocationObjWithSearchParams('/minesweeper/useredux')}>
            Game With useRedux
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export const Home: FC = () => <h2>Minesweeper game Forever!</h2>

export const Routing: FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/minesweeper">
      <Route
        path="hooks"
        element={
          <Suspense fallback={<div>Loading minesweeper with hooks...</div>}>
            <MinesweeperWithHooks />
          </Suspense>
        }
      />
      <Route
        path="usereducer"
        element={
          <Suspense
            fallback={<div>Loading minesweeper with useReducer...</div>}
          >
            <MinesweeperWithUseReducer />
          </Suspense>
        }
      />
      <Route
        path="useredux"
        element={
          <Suspense fallback={<div>Loading minesweeper with use redux...</div>}>
            <MinesweeperWithReactRedux />
          </Suspense>
        }
      />
    </Route>
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
)

const App: FC = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Navigation />
      <Routing />
    </BrowserRouter>
  </Provider>
)

export default App
