import styled from 'styled-components'
import { media } from '../../style/media'
import { theme } from '../../style/theme'
import { ButtonContainer } from '../button/ButtonStyles'

export const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9999;
`

export const PopupContainer = styled.div`
  position: fixed;
  padding: 32px;
  width: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  background-color: ${theme.colors.primaryColor};
  color: ${theme.colors.textColor};

  z-index: 9999;

  ${ButtonContainer} {
    background-color: ${theme.colors.secondaryColor};
    color: ${theme.colors.primaryColor};
    border-color: ${theme.colors.primaryColor};
  }

  ${ButtonContainer}:hover {
    background-color: ${theme.colors.primaryColor};
    color: ${theme.colors.secondaryColor};
    border-color: ${theme.colors.secondaryColor};
  }

  ${media.lg} {
    width: 800px;
  }

  ${media.md},${media.sm} {
    width: 80%;
    height: auto;
    gap: 20px;
    flex-direction: column;
    justify-content: space-between;

    img {
      margin-top: 50px;
      width: 100%;
      height: 400px;
    }

    p {
      font-size: 3rem;
    }

    li {
      font-size: 2.5rem;
    }

    button {
      width: 100%;
      font-size: 2.3rem;
    }
  }
`

export const PopupContent = styled.div`
  padding: 0 0 0 24px;
  height: 100%;

  h2 {
    font-size: 18px;
    font-weight: 900;

    ${media.sm} {
      font-size: 3rem;
    }
  }

  p {
    font-size: 14px;
    line-height: 22px;
    font-weight: 400;
    margin: 12px 0 16px 0;

    ${media.sm} {
      font-size: 1.5rem;
      line-height: 1.5rem;
    }
  }
`

export const PopupImage = styled.img`
  display: flex;
  align-self: center;
  width: 280px;
  height: 280px;
  object-fit: cover;
`

export const PopupButton = styled(ButtonContainer)`
  width: fit-content;

  &:hover {
    background-color: ${theme.colors.primaryColor};
    color: ${theme.colors.secondaryColor};
  }
`

export const PopupCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  color: ${theme.colors.secondaryColor};

  ${media.sm} {
    top: 10px;
    right: -410px;
  }
`
