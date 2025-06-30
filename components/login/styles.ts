import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background.accentPrimary};
`

export const Form = styled.form`
  height: 50%;
  width: 25%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`

export const Input = styled.input`
  width: 100%;
  height: 1.6rem;
  border-radius: 0.3rem;
  border: 1px solid;
  outline: none;
  padding: 0.5rem 0 0.5rem 1rem;
  border-color: ${({ theme }) => theme.colors.border.primary};
`

export const Button = styled.button`
  width: 40%;
  padding: 0.8rem;
  margin-right: auto;
  text-align: center;
  border-radius: 0.3rem;
  background: ${({ theme }) => theme.colors.button.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  transition: hover 0.3s ease;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.text.error};
  font-size: 0.875rem;
  margin: 0;
`

export const SuccessText = styled.p`
  color: ${({ theme }) => theme.colors.text.success};
  font-size: 0.875rem;
  margin: 0;
`
