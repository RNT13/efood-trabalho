import { Link } from 'react-router-dom'
import { styled } from 'styled-components'
import { media } from '../../style/media'
import { theme } from '../../style/theme'

export const HeaderWrapper = styled.div`
  grid-area: header;
`

export const HeaderImage = styled.img`
  object-fit: cover;
  filter: brightness(40%);
  height: 250px;
  width: 100%;
`

export const HeaderNavMenu = styled.nav`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  ${(media.md, media.sm)} {
    flex-direction: column-reverse;
    gap: 20px;
  }
`

export const HeaderTitle = styled.div`
  position: relative;
  top: 220px;
  left: 0px;
  font-size: 36px;
  color: ${theme.colors.textColor};
  text-align: left;
  z-index: 1;

  span {
    margin-left: 20px;
  }
  svg {
    color: ${theme.colors.yellow3};
  }

  ${(media.md, media.sm)} {
    padding-left: 50px;
    font-size: 2.5em;
  }
`

export const HeaderSpan = styled.p`
  color: ${theme.colors.primaryColor};
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    color: ${theme.colors.blue2};
  }

  ${(media.md, media.sm)} {
    font-size: 3rem;
  }
`

export const HeaderLogo = styled.img`
  width: 100px;
  height: auto;

  ${(media.md, media.sm)} {
    width: 200px;
  }
`

export const HeaderText = styled.p`
  font-size: 36px;
  color: ${theme.colors.primaryColor};
  text-align: center;
`

export const NavItem = styled(Link)`
  margin-right: 90px;
  text-decoration: none;
  color: ${theme.colors.primaryColor};
  font-weight: bold;
  font-size: 18px;

  &:hover {
    color: ${theme.colors.blue2};
  }

  ${(media.md, media.sm)} {
    font-size: 3rem;
    margin-right: 0;
  }
`

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 100px;

  ${media.sm} {
    gap: 150px;
  }
`

export const HeaderContainer = styled.div`
  padding-top: 50px;
  width: 100%;
  gap: 20px;
  height: 310px;

  justify-content: space-around;
  background-image: url('/images/Vector.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  ${media.sm} {
    width: 900px;
    height: 550px;
    align-items: stretch center;

    ${NavItem} {
      order: 2;
    }

    ${HeaderText} {
      order: 3;
    }

    ${HeaderLogo} {
      order: 3;
    }

    ${HeaderTitle} {
      order: 4;
    }

    ${HeaderImage} {
      order: 5;
    }
  }
`
