import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { User, ArrowUpRight } from "lucide-react"; // Ícones de UI
import { FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa6"; // Ícones oficiais de marcas (React Icons)
import DevClubLogo from "../assets/logo-devclub.png";

// --- Styled Components ---

const FooterContainer = styled.footer`
  position: relative; /* Mantém no fluxo para ser empurrado para cima */
  z-index: 4;
  background-color: #030308;
  color: #ffffff;
  padding: 5rem 6% 4rem 6%;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.9); /* Sombra para destacar a borda do Footer subindo */
`;

const FooterContent = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2.5rem;
  }
`;

const BrandBlock = styled.div`
  max-width: 320px;
`;

const LogoImage = styled.img`
  height: 48px;
  width: auto;
  object-fit: contain;
  margin-bottom: 0.8rem;
`;

const BrandDescription = styled.p`
  color: #9ca3af;
  font-size: 0.95rem;
  line-height: 1.6;
`;

const TopActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
    align-items: stretch;
  }
`;

const StudentAreaLink = styled.a`
  color: #8b9bb4;
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #ffffff;
  }
`;

const PrimaryButton = styled(motion.button)`
  background: linear-gradient(135deg, #00f2fe 0%, #7f00ff 100%);
  border: none;
  border-radius: 30px;
  color: #030308;
  font-weight: 900;
  font-size: 0.75rem;
  letter-spacing: 2px;
  padding: 0.75rem 1.75rem;
  cursor: pointer;
  box-shadow: 0 0 20px rgba(0, 242, 254, 0.2);
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.12);
  width: 100%;
  margin: 0;
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 3rem;
  }
`;

const SocialBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const SectionTitle = styled.h4`
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 0.5rem;
`;

/* Container Horizontal para os Ícones */
const SocialLinks = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;

const SocialIconLink = styled.a`
  color: #8b9bb4;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;

  &:hover {
    color: #00f2fe;
    border-color: rgba(0, 242, 254, 0.4);
    background: rgba(0, 242, 254, 0.08);
    transform: translateY(-3px);
    box-shadow: 0 4px 15px rgba(0, 242, 254, 0.2);
  }
`;

const NavBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`;

const NavLink = styled.a`
  color: #9ca3af;
  font-size: 0.95rem;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    color: #ffffff;
    transform: translateX(4px);
  }
`;

const Copyright = styled.div`
  text-align: center;
  color: #6b7280;
  font-size: 0.85rem;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

export default function FooterDevClub() {
  return (
    <FooterContainer>
      <FooterContent>
        {/* PARTE SUPERIOR */}
        <TopSection>
          <BrandBlock>
            <LogoImage src={DevClubLogo} alt="DevClub Logo" />
            <BrandDescription>
              Uma das melhores escolas de programação do mercado.
            </BrandDescription>
          </BrandBlock>

          <TopActions>
            <StudentAreaLink href="#login">
              ÁREA DO ALUNO <User size={16} />
            </StudentAreaLink>

            <PrimaryButton
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 25px rgba(0, 242, 254, 0.45)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              QUERO SER ALUNO <ArrowUpRight size={14} />
            </PrimaryButton>
          </TopActions>
        </TopSection>

        <Divider />

        {/* PARTE INFERIOR */}
        <BottomSection>
          {/* REDES SOCIAIS COM REACT-ICONS */}
          <SocialBlock>
            <SectionTitle>Redes Sociais</SectionTitle>
            <SocialLinks>
              <SocialIconLink
                href="https://www.instagram.com/devclubescola/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram size={25} />
              </SocialIconLink>

              <SocialIconLink
                href="https://www.youtube.com/@canaldevclub"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
              >
                <FaYoutube size={25} />
              </SocialIconLink>

              <SocialIconLink
                href="https://www.linkedin.com/in/rodolfomori/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={25} />
              </SocialIconLink>
            </SocialLinks>
          </SocialBlock>

          {/* NAVEGAÇÃO EM COLUNA */}
          <NavBlock>
            <SectionTitle>Navegação</SectionTitle>
            <NavList>
              <NavLink href="#ecosystem-ia-club">Ecossistema IA Club</NavLink>
              <NavLink href="#mentors-ia">Mentores de IA</NavLink>
              <NavLink href="#projects">Projetos</NavLink>
              <NavLink href="#testimonials">Depoimentos de alunos</NavLink>
              <NavLink href="#teacher">Os mentores</NavLink>
              <NavLink href="#bonus">Módulo bônus</NavLink>
              <NavLink href="#certificates">Certificados</NavLink>
            </NavList>
          </NavBlock>
        </BottomSection>

        <Copyright>
          © {new Date().getFullYear()} DevClub. Todos os direitos reservados.
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
}
