import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 20rem 1fr;
  background: ${({ theme }) => theme.colors.background.accentPrimary};
`
