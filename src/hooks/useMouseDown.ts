import { useCallback, useState } from 'react'

export type SetMouseDownStatus = () => void
export type SetMouseUpStatus = () => void

export const useMouseDown = (): [
  boolean,
  SetMouseDownStatus,
  SetMouseUpStatus
] => {
  const [mouseDwon, setMouseDown] = useState(false)
  const onMouseDown = useCallback(() => {
    ;() => setMouseDown(true)
  }, [])

  const onMouseUp = useCallback(() => {
    ;() => setMouseDown(false)
  }, [])

  return [mouseDwon, onMouseDown, onMouseUp]
}
