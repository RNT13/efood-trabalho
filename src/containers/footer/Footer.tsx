import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { FooterContainer, FooterLogo, FooterText, SocialLinks, SocialLinksItens } from './FooterStyles'

export default function Footer() {
  return (
    <FooterContainer>
      <FooterLogo src="/images/logo.png" alt="Logo" />
      <SocialLinks>
        <SocialLinksItens href="https://github.com/RNT13" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </SocialLinksItens>
        <SocialLinksItens href="https://www.linkedin.com/in/renato-luiz-0b072b247/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </SocialLinksItens>
        <SocialLinksItens href="https://www.instagram.com/renatominoita/" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </SocialLinksItens>
      </SocialLinks>
      <FooterText>
        A efood é uma plataforma para divulgação de estabelecimentos, a responsabilidade pela entrega, qualidade dos produtos é toda do
        estabelecimento contratado.
      </FooterText>
    </FooterContainer>
  )
}
