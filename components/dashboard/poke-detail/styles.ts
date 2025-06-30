import styled from 'styled-components'
import { BadgeProps } from '.'

export const Container = styled.div`
  height: 100%;
  width: 100%;
  background: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.text.accent};
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 6rem;

  > main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;

    .row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      align-items: center;
      justify-content: space-between;

      > div {
        text-align: center;
        align-items: center;
        justify-content: center;
      }
    }
  }

  & section {
    max-height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: space-between;

    & img {
      width: 15rem;
      height: 15rem;
      image-rendering: pixelated;
      margin: 0 auto;
    }
  }
`

export const Heading = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  color: ${({ theme }) => theme.colors.text.primary};

  > div {
    display: flex;
    align-items: center;
  }

  & h1 {
    font-size: 2.5rem;
    text-transform: uppercase;
    font-weight: 300;
  }
`

export const Accent = styled.div`
  border-radius: 0.8rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
  font-size: 0.9rem;
  gap: 0.5rem;
  background: ${({ theme }) => theme.colors.background.accentPrimary};

  & h2 {
    font-weight: 600;
  }

  .stats {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
    }
  }

  .evoloution-chain {
    > div {
      display: grid;
      grid-template-columns: repeat(3, 1fr);

      .evolution {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        &:hover {
          opacity: 0.5;
        }
      }
    }
  }

  .about-pokemon {
    height: 50vh;
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5rem;
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none;
    }

    scrollbar-width: none;

    -ms-overflow-style: none;

    h2 {
      font-weight: 600;
    }

    p {
      line-height: 1.1;
      text-align: justify;
      font-size: 0.8rem;
    }
  }
`

export const Badge = styled.div<BadgeProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.primary};
  border-radius: 0.5rem;
  height: 1.5rem;
  gap: 0.3rem;
  background: ${({ theme, variant }) =>
    theme.colors.bagdeColors[variant || 'default']};
  text-transform: uppercase;
  min-width: 5rem;
`
