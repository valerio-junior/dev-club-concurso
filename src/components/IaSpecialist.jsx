import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, Code2, Briefcase } from 'lucide-react';

// Substitua os caminhos abaixo pelos caminhos reais das pastas do seu projeto
import imgHtml from '../assets/especialista-html.png';
import imgCss from '../assets/especialista-css.png';
import imgJs from '../assets/especialista-js.png';
import imgReact from '../assets/especialista-react.png';
import imgNode from '../assets/especialista-node.png';
import imgCarreira from '../assets/especialista-carreira-dev.png';
import imgLinkedin from '../assets/especialista-linkedin.png';
import imgCurriculo from '../assets/especialista-curriculo.png';

const SectionContainer = styled.section`
  min-height: 90vh;
  width: 100%;
  background-color: #030308;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  position: relative;
  overflow: hidden;
  font-family: 'Orbitron', sans-serif;

  /* Detalhe de luz de fundo para dar a atmosfera de Inteligência Artificial */
  &::before {
    content: '';
    position: absolute;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(0, 242, 254, 0.08) 0%, rgba(0,0,0,0) 70%);
    top: 20%;
    right: 10%;
    z-index: 1;
    pointer-events: none;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  align-items: center;
  z-index: 2;

  @media (min-width: 968px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
`;

const TextSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  font-family: 'Inter', sans-serif; /* Mantendo fontes limpas para leitura */
`;

const Badge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 242, 254, 0.05);
  border: 1px solid rgba(0, 242, 254, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  width: fit-content;
  color: #00f2fe;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 1px;
`;

const MainTitle = styled.h2`
  font-family: 'Orbitron', sans-serif;
  font-size: 2.5rem;
  font-weight: 900;
  line-height: 1.2;
  color: #ffffff;

  span {
    background: linear-gradient(to right, #00f2fe, #7f00ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 576px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  color: #8b949e;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-top: 1rem;
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 1.2rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: border-color 0.3s ease;

  svg {
    color: #7f00ff;
  }

  &:hover {
    border-color: rgba(127, 0, 255, 0.3);
  }
`;

const FeatureTitle = styled.h4`
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
`;

const ImageSide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 480px; /* Evita que o layout quebre ou mude de tamanho na transição */
`;

const CardFrame = styled.div`
  position: relative;
  width: 320px;
  height: 450px;
  border-radius: 16px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 242, 254, 0.05);

  /* Moldura decorativa externa simulando tecnologia de IA */
  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: linear-gradient(45deg, #00f2fe, transparent, #7f00ff, transparent);
    border-radius: 18px;
    z-index: -1;
    opacity: 0.4;
  }
`;

const StyledImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 16px;
`;

// Lista ordenada das imagens mapeadas para rodar no loop de segundos
const AI_AGENTS = [
  imgHtml,
  imgCss,
  imgJs,
  imgReact,
  imgNode,
  imgCarreira,
  imgLinkedin,
  imgCurriculo
];

export default function IaAgents() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Configura a troca automática a cada 3.5 segundos (tempo ideal para leitura parcial do card)
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % AI_AGENTS.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <SectionContainer>
      <ContentWrapper>
        
        {/* Lado Esquerdo: Textos e Features */}
        <TextSide>
          <Badge>
            <Bot size={16} />
            TECNOLOGIA EXCLUSIVA
          </Badge>
          <MainTitle>
            Seu Aprendizado Potencializado por <span>Mentores de IA</span>
          </MainTitle>
          <Description>
            Tenha suporte instantâneo a qualquer hora do dia. Nossa inteligência artificial foi treinada com a metodologia DevClub para guiar você de forma personalizada, corrigindo códigos e simulando entrevistas de carreira.
          </Description>

          <FeaturesGrid>
            <FeatureCard>
              <Code2 size={20} />
              <FeatureTitle>Code Review 24h</FeatureTitle>
              <p style={{ fontSize: '0.85rem', color: '#8b949e' }}>Suporte técnico com especialistas em HTML, React e Node para tirar suas dúvidas de código.</p>
            </FeatureCard>
            <FeatureCard>
              <Briefcase size={20} />
              <FeatureTitle>Preparação de Carreira</FeatureTitle>
              <p style={{ fontSize: '0.85rem', color: '#8b949e' }}>Agentes prontos para auditar seu perfil do LinkedIn e ajustar seu currículo profissional.</p>
            </FeatureCard>
          </FeaturesGrid>
        </TextSide>

        {/* Lado Direito: Carrossel Inteligente com AnimatePresence */}
        {/* Lado Direito: Carrossel Inteligente com Crossfade Direto */}
<ImageSide>
  <CardFrame>
    <AnimatePresence initial={false}>
      <StyledImage
        key={currentIndex}
        src={AI_AGENTS[currentIndex]}
        alt="Agente de IA DevClub"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "linear" }} 
      />
    </AnimatePresence>
  </CardFrame>
</ImageSide>

      </ContentWrapper>
    </SectionContainer>
  );
}