import styled from '@emotion/styled'
import { FC, memo, ReactNode } from 'react'
import { Legend, LegendProps } from './Legend'

export const GameName = styled.h1`
  font-size: 2em;
`

interface Props extends LegendProps {
  children: ReactNode
}

export const Top = memo(({ children, ...legendProps }: Props) => (
  <Header>
    <GameName>{children}</GameName>
    <Legend {...legendProps} />
  </Header>
))

Top.displayName = 'Top'

const Header = styled.header`
  text-align: center;
  position: relative;
  display: inline-block;
`
