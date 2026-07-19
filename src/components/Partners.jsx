import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const slideLeft = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const SectionContainer = styled.section`
  width: 100%;
  background-color: #030308;
  padding: 6rem 0 4rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0, 242, 254, 0.15), transparent);
  }
`;

const Title = styled(motion.h3)`
  font-size: 0.95rem;
  color: #8b9bb4;
  text-align: center;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 4rem;
  padding: 0 2rem;
  line-height: 1.6;
  font-weight: 700;

  span {
    background: linear-gradient(135deg, #00f2fe 0%, #7f00ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 900;
  }
`;

const MarqueeContainer = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  display: flex;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 250px;
    height: 100%;
    z-index: 5;
    pointer-events: none;
  }

  &::before {
    left: 0;
    background: linear-gradient(to right, #030308 20%, transparent 100%);
  }

  &::after {
    right: 0;
    background: linear-gradient(to left, #030308 20%, transparent 100%);
  }
`;

const MarqueeTrack = styled.div`
  display: flex;
  width: max-content;
  animation: ${slideLeft} 25s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
`;

const LogoGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 7rem;
  padding-right: 7rem;
`;

// Wrapper para as logos SVG que controla as transições de cor e brilho
const LogoWrapper = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  
  svg {
    height: 100%;
    width: auto;
    max-width: 130px;
    // Estado inicial: Cinza metálico integrado ao tema escuro
    fill: #4e596f;
    filter: grayscale(1) brightness(0.8);
    transition: all 0.4s ease;
  }

  &:hover {
    transform: scale(1.12);
    
    svg {
      filter: grayscale(0) brightness(1.2);
      // Aplica a cor original de cada marca usando as classes específicas abaixo
      &.facebook { fill: #1877F2; filter: drop-shadow(0 0 10px rgba(24, 119, 242, 0.4)); }
      &.ambev { fill: #F4C300; filter: drop-shadow(0 0 10px rgba(244, 195, 0, 0.4)); }
      &.ifood { fill: #EA1D2C; filter: drop-shadow(0 0 10px rgba(234, 29, 44, 0.4)); }
      &.usr { fill: #00F2FE; filter: drop-shadow(0 0 10px rgba(0, 242, 254, 0.4)); }
      &.globo { fill: #FFFFFF; filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3)); }
      &.amazon { fill: #FF9900; filter: drop-shadow(0 0 10px rgba(255, 153, 0, 0.4)); }
    }
  }
`;

export default function Partners() {
  return (
    <SectionContainer id="partners-section">
      <Title
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
      >
        Venha ser nosso aluno e trabalhe em empresas como:
      </Title>

      <MarqueeContainer>
        <MarqueeTrack>
          {/* Grupo 1 */}
          <LogoGroup>
            {/* Facebook */}
            <LogoWrapper>
              <svg className="facebook" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </LogoWrapper>

            {/* Ambev */}
            <LogoWrapper>
              <svg className="ambev" viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg">
                <text x="0" y="22" fontFamily="sans-serif" fontWeight="900" fontSize="24" letterSpacing="1">ambev</text>
                <path d="M90 5 Q95 0 100 5 T110 5" fill="none" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </LogoWrapper>

            {/* iFood */}
            <LogoWrapper>
              <svg className="ifood" viewBox="0 0 100 35" xmlns="http://www.w3.org/2000/svg">
                <text x="5" y="25" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="28" fontStyle="italic">iFood</text>
                <path d="M25 28 Q45 35 70 28" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </LogoWrapper>

            {/* USR (Sleek Tech Brand) */}
            <LogoWrapper>
              <svg className="usr" viewBox="0 0 100 35" xmlns="http://www.w3.org/2000/svg">
                <text x="0" y="25" fontFamily="'Orbitron', sans-serif" fontWeight="900" fontSize="26" letterSpacing="2">USR</text>
                <rect x="78" y="8" width="10" height="10" fill="currentColor" />
                <line x1="0" y1="29" x2="88" y2="29" stroke="currentColor" strokeWidth="2" />
              </svg>
            </LogoWrapper>

            {/* Globo */}
            <LogoWrapper>
              <svg className="globo" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4c2.613 0 4.84 1.67 5.657 4H6.343C7.16 5.67 9.387 4 12 4zm0 16c-2.613 0-4.84-1.67-5.657-4h11.314c-.817 2.33-3.044 4-5.657 4zm6-6H6c-.55 0-1-.45-1-1s.45-1 1-1h12c.55 0 1 .45 1 1s-.45 1-1 1z"/>
              </svg>
            </LogoWrapper>

            {/* Amazon */}
            <LogoWrapper>
              <svg className="amazon" viewBox="0 0 100 35" xmlns="http://www.w3.org/2000/svg">
                <text x="5" y="20" fontFamily="sans-serif" fontWeight="800" fontSize="20">amazon</text>
                <path d="M10 24 Q45 34 80 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M76 22 L82 25 L81 18" fill="currentColor"/>
              </svg>
            </LogoWrapper>
          </LogoGroup>

          {/* Grupo 2 (Cópia exata para o loop infinito sem saltos) */}
          <LogoGroup>
            <LogoWrapper>
              <svg className="facebook" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </LogoWrapper>

            <LogoWrapper>
              <svg className="ambev" viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg">
                <text x="0" y="22" fontFamily="sans-serif" fontWeight="900" fontSize="24" letterSpacing="1">ambev</text>
                <path d="M90 5 Q95 0 100 5 T110 5" fill="none" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </LogoWrapper>

            <LogoWrapper>
              <svg className="ifood" viewBox="0 0 100 35" xmlns="http://www.w3.org/2000/svg">
                <text x="5" y="25" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="28" fontStyle="italic">iFood</text>
                <path d="M25 28 Q45 35 70 28" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </LogoWrapper>

            <LogoWrapper>
              <svg className="usr" viewBox="0 0 100 35" xmlns="http://www.w3.org/2000/svg">
                <text x="0" y="25" fontFamily="'Orbitron', sans-serif" fontWeight="900" fontSize="26" letterSpacing="2">USR</text>
                <rect x="78" y="8" width="10" height="10" fill="currentColor" />
                <line x1="0" y1="29" x2="88" y2="29" stroke="currentColor" strokeWidth="2" />
              </svg>
            </LogoWrapper>

            <LogoWrapper>
              <svg className="globo" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4c2.613 0 4.84 1.67 5.657 4H6.343C7.16 5.67 9.387 4 12 4zm0 16c-2.613 0-4.84-1.67-5.657-4h11.314c-.817 2.33-3.044 4-5.657 4zm6-6H6c-.55 0-1-.45-1-1s.45-1 1-1h12c.55 0 1 .45 1 1s-.45 1-1 1z"/>
              </svg>
            </LogoWrapper>

            <LogoWrapper>
              <svg className="amazon" viewBox="0 0 100 35" xmlns="http://www.w3.org/2000/svg">
                <text x="5" y="20" fontFamily="sans-serif" fontWeight="800" fontSize="20">amazon</text>
                <path d="M10 24 Q45 34 80 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M76 22 L82 25 L81 18" fill="currentColor"/>
              </svg>
            </LogoWrapper>
          </LogoGroup>
        </MarqueeTrack>
      </MarqueeContainer>
    </SectionContainer>
  );
}