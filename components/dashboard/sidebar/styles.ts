import styled from 'styled-components'

interface PokemonItemProps {
  selected?: boolean
}

export const Container = styled.aside`
  padding: 2rem;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  flex-direction: column;
  font-weight: 200;

  align-items: center;
  gap: 2rem;

  & div {
    gap: 1rem;
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > h3 {
      font-size: 0.8rem;
      line-height: 1rem;
      text-align: center;
    }
  }

  & .heading {
    display: flex;
    justify-content: start;
    align-items: start;

    gap: 0.3rem;

    > div {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: start;

      > h1 {
        text-transform: uppercase;
        font-weight: 500;
        font-size: 2.4rem;
      }
    }
  }
`

export const InputWrapper = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.colors.input.background};
  color: ${({ theme }) => theme.colors.input.text};
  padding: 0.5rem 0.8rem;
  border-radius: 1.5rem;
  position: relative;
  font-size: 0.8rem;
  margin-bottom: 1rem;

  .search {
    position: absolute;
    left: 1rem;
    flex-shrink: 0;
  }

  .clean {
    position: absolute;
    right: 1rem;
    flex-shrink: 0;
  }
`

export const Input = styled.input`
  background: transparent;
  color: inherit;
  border: none;
  width: 100%;
  padding-left: 3rem;
  flex: 1;
  font-size: 0.8rem;
  outline: none;
`

export const Separator = styled.div`
  height: 1px;
  display: flex;
  width: 100%;
  background: ${({ theme }) => theme.colors.background.accentPrimary};
`

export const PokemonList = styled.ul`
  list-style: none;
  width: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  max-height: 100%;
  overflow-y: scroll;
  flex-direction: column;
  gap: 0.8rem;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: white;
  }

  &::-webkit-scrollbar-thumb {
    background: black;
    border-radius: 6px;
    border: 2px solid transparent;
    position: relative;
  }

  &::-webkit-scrollbar-thumb::before {
    content: '';
    display: block;
    height: 20%;
    background: white;
    border-radius: 6px 6px 0 0;
  }

  scrollbar-width: thin;
  scrollbar-color: black transparent;
`

export const PokemonItem = styled.li<PokemonItemProps>`
  width: 100%;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    opacity: 0.8;
  }

  ${({ selected }) =>
    selected &&
    `
    font-weight: bold;
    text-decoration: underline;
    font-size: 1.1rem;
  `}
`
