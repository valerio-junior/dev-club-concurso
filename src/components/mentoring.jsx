import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Video, LifeBuoy, Briefcase } from 'lucide-react';

// Importação das imagens enviadas
import imgComunidade from '../assets/comunidade.png';
import imgMentorias from '../assets/mentorias.png';
import imgSuporte from '../assets/suporte.png';
import imgVagas from '../assets/vagas.png';

const SectionContainer = styled.section`
  height: 100vh; /* Força a seção a ter exatamente o tamanho da tela */
  width: 100%;
  background-color: #030308;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem; /* Reduzido para dar mais respiro interno */
  position: relative;
  overflow: hidden; /* Evita qualquer scroll indesejado */
`;

const ContainerWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem; /* Reduzido o espaço entre o header e o conteúdo */
`;

const HeaderCenter = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  max-width: 700px;
  margin: 0 auto;
`;

const SectionBadge = styled.div`
  background: rgba(127, 0, 255, 0.1);
  border: 1px solid rgba(127, 0, 255, 0.3);
  padding: 0.4rem 1rem;
  border-radius: 50px;
  color: #a855f7;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 1.5px;
`;

const Title = styled.h2`
  font-family: 'Orbitron', sans-serif;
  font-size: 2.2rem; /* Reduzido de 2.6rem para economizar espaço vertical */
  font-weight: 900;
  color: #ffffff;
  line-height: 1.1;

  span {
    background: linear-gradient(to right, #7f00ff, #00f2fe);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Subtitle = styled.p`
  font-family: 'Inter', sans-serif;
  color: #8b949e;
  font-size: 1rem; /* Reduzido de 1.1rem */
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  align-items: center;
  height: 65vh; /* Define uma altura máxima segura para a área de conteúdo */

  @media (min-width: 968px) {
    grid-template-columns: 0.9fr 1.1fr;
  }
`;

const TabsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem; /* Mais compacto para os botões ficarem juntos */
`;

const TabButton = styled.button`
  background: ${props => props.$active ? 'rgba(255, 255, 255, 0.03)' : 'transparent'};
  border: 1px solid ${props => props.$active ? 'rgba(0, 242, 254, 0.2)' : 'rgba(255, 255, 255, 0.02)'};
  padding: 1rem 1.2rem; /* Reduzido o padding interno dos botões */
  border-radius: 14px;
  display: flex;
  align-items: center; /* Mudado para center para ficar alinhado mesmo quando compacto */
  gap: 1rem;
  cursor: pointer;
  text-align: left;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.02);
    border-color: ${props => props.$active ? 'rgba(0, 242, 254, 0.2)' : 'rgba(255, 255, 255, 0.06)'};
  }
`;

const IconWrapper = styled.div`
  background: ${props => props.$active ? 'linear-gradient(135deg, #7f00ff, #00f2fe)' : 'rgba(255, 255, 255, 0.05)'};
  color: ${props => props.$active ? '#ffffff' : '#8b949e'};
  padding: 0.6rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0; /* Impede o ícone de amassar em telas menores */
`;

const TabTextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-family: 'Inter', sans-serif;
`;

const TabTitle = styled.h3`
  color: ${props => props.$active ? '#ffffff' : '#c9d1d9'};
  font-size: 1.05rem; /* Ajustado sutilmente */
  font-weight: 700;
`;

const TabDesc = styled.p`
  color: #8b949e;
  font-size: 0.85rem; /* Texto de apoio ligeiramente menor */
  line-height: 1.4;
  display: ${props => props.$active ? 'block' : 'none'};
  max-width: 400px;
`;

const DisplaySide = styled.div`
  background: radial-gradient(circle at center, rgba(127, 0, 255, 0.03) 0%, transparent 70%);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%; /* Ocupa o limite máximo da Grid sem estourar */
  position: relative;
`;

const ImageContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  max-height: 380px; /* Limitador crucial para impedir o scroll da tela inteira */
  object-fit: contain; /* Garante que imagens verticais ou horizontais fiquem perfeitas dentro do box */
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
`;

const ECOSYSTEM_DATA = [
  {
    id: 'comunidade',
    title: 'Comunidade Exclusiva',
    desc: 'Conecte-se com milhares de devs e entusiastas de IA no DevClub + IaClub. O ambiente perfeito para fazer networking, debater códigos e estruturar projetos.',
    icon: Users,
    image: imgComunidade
  },
  {
    id: 'mentorias',
    title: 'Mentorias e Calls Ao Vivo',
    desc: 'Participe de sessões diretas com quem está no topo do mercado. Tenha direcionamento estratégico e acelere seu posicionamento profissional.',
    icon: Video,
    image: imgMentorias
  },
  {
    id: 'suporte',
    title: 'Suporte Técnico Humanizado',
    desc: 'Nada de travar em bugs por dias. Nosso time de suporte especializado responde suas dúvidas em poucos minutos direto na plataforma.',
    icon: LifeBuoy,
    image: imgSuporte
  },
  {
    id: 'vagas',
    title: 'Plataforma de Vagas Privada',
    desc: 'Acesso direto ao ecossistema de contratação. Explore oportunidades exclusivas em empresas inovadoras e projetos freelancer validados.',
    icon: Briefcase,
    image: imgVagas
  }
];

export default function MentoringSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <SectionContainer>
      <ContainerWrapper>
        
        <HeaderCenter>
          <SectionBadge>ECOSSISTEMA COMPLETO</SectionBadge>
          <Title>Muito Além de <span>Aulas Gravadas</span></Title>
          <Subtitle>Tudo o que você precisa para conquistar sua vaga no mercado de tecnologia em um único lugar.</Subtitle>
        </HeaderCenter>

        <MainGrid>
          {/* Lado Esquerdo - Seleção de Recursos */}
          <TabsList>
            {ECOSYSTEM_DATA.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = activeTab === index;
              return (
                <TabButton 
                  key={tab.id} 
                  $active={isActive}
                  onClick={() => setActiveTab(index)}
                >
                  <IconWrapper $active={isActive}>
                    <Icon size={18} />
                  </IconWrapper>
                  <TabTextContent>
                    <TabTitle $active={isActive}>{tab.title}</TabTitle>
                    <TabDesc $active={isActive}>{tab.desc}</TabDesc>
                  </TabTextContent>
                </TabButton>
              );
            })}
          </TabsList>

          {/* Lado Direito - Preview Visual Encaixado */}
          <DisplaySide>
            <AnimatePresence mode="wait">
              <ImageContainer
                key={activeTab}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3 }}
              >
                <PreviewImage 
                  src={ECOSYSTEM_DATA[activeTab].image} 
                  alt={ECOSYSTEM_DATA[activeTab].title} 
                />
              </ImageContainer>
            </AnimatePresence>
          </DisplaySide>

        </MainGrid>

      </ContainerWrapper>
    </SectionContainer>
  );
}