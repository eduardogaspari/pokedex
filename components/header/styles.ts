import styled from 'styled-components'

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.background.primary};
`

export const Button = styled.button`
  all: unset;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`
