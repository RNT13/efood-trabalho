import { styled } from 'styled-components'
import { theme } from '../../style/theme'

export const MaskedInputContainer = styled.div`
  width: 100%;

  div {
    color: ${theme.colors.red};
    font-size: 16px;
    font-weight: 700;
    text-shadow: 1px 1px 1px black;
  }

  input {
    width: 100%;
    padding: 8px;
    border: 2px solid ${theme.colors.primaryColor};
    background-color: ${theme.colors.secondaryColor};
    color: ${theme.colors.primaryColor};
    font-size: 14px;
    font-weight: 900;

    &::placeholder {
      color: ${theme.colors.primaryColor};
    }

    &:focus {
      outline: none;
      border: 2px solid ${theme.colors.orange};
    }

    &.error {
      border: 2px solid ${theme.colors.red};
      background-color: ${theme.colors.red};
      color: ${theme.colors.textColor};
      font-weight: 700;

      &::placeholder {
        color: ${theme.colors.secondaryColor};
      }
    }
  }
`
