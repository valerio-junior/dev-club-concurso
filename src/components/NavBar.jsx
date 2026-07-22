import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  ChevronDown,
  GraduationCap,
  Code,
  Brain,
  ArrowUpRight,
} from "lucide-react";
import DevClubLogo from "../assets/logo-devclub.png"

const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: rgba(3, 3, 8, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4rem;
  z-index: 1000;

  @media (max-width: 1024px) {
    padding: 0 2rem;
  }
`;

// Logo Atualizada com Imagem Oficial
const LogoArea = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const LogoImage = styled.img`
  height: 42px;
  width: auto;
  object-fit: contain;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;

  @media (max-width: 900px) {
    display: none;
  }
`;

const NavItemContainer = styled.div`
  position: relative;
  height: 80px;
  display: flex;
  align-items: center;
`;

const NavLink = styled.a`
  color: #c9d1d9;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #00f2fe;
  }
`;

const DropdownBox = styled(motion.div)`
  position: absolute;
  top: 75px;
  left: 50%;
  transform: translateX(-50%);
  width: 280px;
  background: rgba(6, 6, 15, 0.95);
  border: 1px solid rgba(0, 242, 254, 0.15);
  border-radius: 12px;
  padding: 1rem;
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.5),
    0 0 30px rgba(0, 242, 254, 0.05);
  backdrop-filter: blur(20px);
  z-index: 1001;
`;

const DropdownItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0.75rem;
  border-radius: 8px;
  color: #8b9bb4;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  svg {
    color: #7f00ff;
    transition: color 0.3s ease;
  }

  &:hover {
    background: rgba(0, 242, 254, 0.05);
    color: #ffffff;

    svg {
      color: #00f2fe;
    }
  }
`;

const ActionArea = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
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

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  return (
    <NavContainer
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Logo Oficial DevClub em Imagem */}
      <LogoArea onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <LogoImage src={DevClubLogo} alt="DevClub Logo" />
      </LogoArea>

      <NavLinks>
        <NavItemContainer
          onMouseEnter={() => setActiveDropdown("formacoes")}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <NavLink>
            FORMAÇÕES <ChevronDown size={14} />
          </NavLink>

          <AnimatePresence>
            {activeDropdown === "formacoes" && (
              <DropdownBox
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <DropdownItem whileHover={{ x: 5 }}>
                  <Code size={16} /> HTML & CSS
                </DropdownItem>
                <DropdownItem whileHover={{ x: 5 }}>
                  <Code size={16} /> JavaScript
                </DropdownItem>
                <DropdownItem whileHover={{ x: 5 }}>
                  <Code size={16} /> Automações Avançadas com N8N
                </DropdownItem>
                <DropdownItem
                  whileHover={{ x: 5 }}
                  style={{
                    borderTop: "1px solid rgba(255,255,255,0.05)",
                    paddingTop: "0.75rem",
                    marginTop: "0.5rem",
                  }}
                >
                  <GraduationCap size={16} /> DevClub FullStack
                </DropdownItem>
                <DropdownItem whileHover={{ x: 5 }}>
                  <GraduationCap size={16} /> DevClub Front-End
                </DropdownItem>
                <DropdownItem whileHover={{ x: 5 }}>
                  <Code size={16} /> E muito +
                </DropdownItem>
              </DropdownBox>
            )}
          </AnimatePresence>
        </NavItemContainer>

        <NavItemContainer
          onMouseEnter={() => setActiveDropdown("faculdade")}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <NavLink>
            FACULDADE <ChevronDown size={14} />
          </NavLink>

          <AnimatePresence>
            {activeDropdown === "faculdade" && (
              <DropdownBox
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <DropdownItem whileHover={{ x: 5 }}>
                  <Brain size={16} /> MBA em Inteligência Artificial
                </DropdownItem>
              </DropdownBox>
            )}
          </AnimatePresence>
        </NavItemContainer>
      </NavLinks>

      <ActionArea>
        <StudentAreaLink href="#">
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
      </ActionArea>
    </NavContainer>
  );
}
