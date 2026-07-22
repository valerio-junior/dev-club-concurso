import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Code2, Briefcase } from 'lucide-react';

// Substitua os caminhos abaixo pelos caminhos reais das pastas do seu projeto
import imgHtml from '../assets/especialista-html.png';
import imgCss from '../assets/especialista-css.png';
import imgJs from '../assets/especialista-js.png';
import imgReact from '../assets/especialista-react.png';
import imgNode from '../assets/especialista-node.png';
import imgCarreira from '../assets/especialista-carreira-dev.jpg';
import imgLinkedin from '../assets/especialista-linkedin.jpg';
import imgCurriculo from '../assets/especialista-curriculo.jpg';

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
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 1px;
`;

const MainTitle = styled.h2`
  font-size: 2rem;
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
  overflow: hidden;

  /* Moldura decorativa externa simulando tecnologia de IA */
  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    // background: linear-gradient(45deg, #00f2fe, transparent, #7f00ff, transparent);
    border-radius: 18px;
    z-index: -1;
    opacity: 0.4;
  }
`;

const StyledImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 16px;
  z-index: 1;
`;

/* --- ELEMENTOS ESTILIZADOS PARA O TEXTO INTERNO DO CARD --- */

const CardContentOverlay = styled(motion.div)`
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  padding: 2rem 1.5rem;
  pointer-events: none;
`;

const CardTextGroup = styled.div`
  margin-top: 10.5rem; /* Ajustado de 7.5rem para 10.5rem para mover o título e a descrição mais para baixo */
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const CardTitle = styled.h3`
  color: #ffffff;
  font-size: 1.35rem;
  font-weight: 800;
  text-align: left;
`;

const CardDescription = styled.p`
  color: #dae1e7;
  font-size: 0.82rem;
  line-height: 1.5;
  text-align: left;
`;

const CardTag = styled.span`
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  background: rgba(0, 200, 83, 0.1);
  border: 1px solid rgba(0, 200, 83, 0.3);
  color: #00c853;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 1px;
  padding: 0.35rem 0.75rem;
  border-radius: 4px;
  text-transform: uppercase;
`;

// Mapeamento completo dos dados dinâmicos de cada Agente de IA
const AI_AGENTS = [
  {
    image: imgHtml,
    title: "Especialista em HTML",
    description: "Especialista em HTML5. Ajudo a construir a base da web corretamente, fogando em tags semânticas, organização do DOM e acessibilidade .",
    category: "programação"
  },
  {
    image: imgCss,
    title: "Especialista em CSS",
    description: "Especialista de CSS e estilização do DevClub. Ensino alunos a dominar o Flexbox, grid, responsividade (Mobile First) e criar layouts modernos.",
    category: "programação"
  },
  {
    image: imgJs,
    title: "Especialista em JavaScript",
    description: "Mentor de lógica e JavaScript do DevClub. Ajudo os alunos a dominar o ES6+, manipulação do DOM, funções e a criar base sólida necessária para o React",
    category: "programação"
  },
  {
    image: imgReact,
    title: "Especialista em React",
    description: "Especialista em ensino de React. Tire dúvidas sobre useState, useEffect e aprenda boas práticas de arquitetura e correção de erros.",
    category: "programação"
  },
  {
    image: imgNode,
    title: "Especialista em Node.js",
    description: "Mentor de Backend e Node.js do DevClub. Ensino os alunos a criar APIs RESTful, servidores com Express, conectar bancos de dados e arquitetar aplicações escaláveis",
    category: "programação"
  },
  {
    image: imgCarreira,
    title: "Especialista em Carreira Dev",
    description: "Sou um agente especializado em estratégia de carreira Tech. Atuo como um mentor sênior que planeja seus próximos passos profissionais, do Júnior ao C-Level.",
    category: "carreira"
  },
  {
    image: imgLinkedin,
    title: "Especialista em LinkedIn",
    description: "Sou um agente especializado em estratégia de Linkedin. Atuo como um consultor de marca pessoal que audita o seu perfil e sugere otimizações práticas para aumentar a sua visibilidade e atrair as oportunidades certas",
    category: "carreira"
  },
  {
    image: imgCurriculo,
    title: "Especialista em Currículo",
    description: "Sou um agente especializado em análise e otimização de curriculos. Atuo como um recrutador técnico que identifica pontos de melhoria na estrutura, conteúdo e palavras chave para aumentar suas chances de aprovação em processos seletivos ",
    category: "carreira"
  }
];

export default function IaAgents() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Configura a troca automática a cada 3.5 segundos
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % AI_AGENTS.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const currentAgent = AI_AGENTS[currentIndex];

  return (
    <SectionContainer id='mentors-ia'>
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

        {/* Lado Direito: Carrossel Inteligente com Overlays de Texto */}
        <ImageSide>
          <CardFrame>
            <AnimatePresence initial={false}>
              {/* Imagem de Fundo (Preta com a Logo no Topo) */}
              <StyledImage
                key={`img-${currentIndex}`}
                src={currentAgent.image}
                alt={currentAgent.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "linear" }} 
              />
              
              {/* Textos sobrepostos dinamicamente em sincronia com o crossfade */}
              <CardContentOverlay
                key={`text-${currentIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "linear" }}
              >
                <CardTextGroup>
                  <CardTitle>{currentAgent.title}</CardTitle>
                  <CardDescription>{currentAgent.description}</CardDescription>
                </CardTextGroup>
                
                <CardTag>{currentAgent.category}</CardTag>
              </CardContentOverlay>
            </AnimatePresence>
          </CardFrame>
        </ImageSide>

      </ContentWrapper>
    </SectionContainer>
  );
}