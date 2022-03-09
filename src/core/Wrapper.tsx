import { FC } from 'react'
import styled from '@emotion/styled'

export const Wrapper: FC = ({ children }) => {
  return <Frame>{children}</Frame>
}

const Frame = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
