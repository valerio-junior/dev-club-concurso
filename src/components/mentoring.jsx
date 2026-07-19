import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Video, LifeBuoy, Briefcase, Code, Brain, ArrowUpRight } from 'lucide-react';

// Importação das imagens restantes
import imgMentorias from '../assets/mentorias.png';
import imgSuporte from '../assets/suporte.png';
import imgVagas from '../assets/vagas.png';

const SectionContainer = styled.section`
  height: 100vh;
  width: 100%;
  background-color: #030308;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
`;

const ContainerWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
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
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 1.5px;
`;

const Title = styled.h2`
  font-size: 2.2rem;
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
  color: #8b949e;
  font-size: 1rem;
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  align-items: center;
  height: 65vh;

  @media (min-width: 968px) {
    grid-template-columns: 0.9fr 1.1fr;
  }
`;

const TabsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const TabButton = styled.button`
  background: ${props => props.$active ? 'rgba(255, 255, 255, 0.03)' : 'transparent'};
  border: 1px solid ${props => props.$active ? 'rgba(0, 242, 254, 0.2)' : 'rgba(255, 255, 255, 0.02)'};
  padding: 1rem 1.2rem;
  border-radius: 14px;
  display: flex;
  align-items: center;
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
  flex-shrink: 0;
`;

const TabTextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const TabTitle = styled.h3`
  color: ${props => props.$active ? '#ffffff' : '#c9d1d9'};
  font-size: 1.05rem;
  font-weight: 700;
`;

const TabDesc = styled.p`
  color: #8b949e;
  font-size: 0.85rem;
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
  height: 100%;
  position: relative;
`;

const ContentContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  max-height: 380px;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
`;

/* --- CARD EXCLUSIVO DE COMUNIDADE VIA CÓDIGO --- */
const NativeCommunityCard = styled.div`
  width: 100%;
  max-width: 460px;
  background: linear-gradient(135deg, rgba(20, 20, 35, 0.6) 0%, rgba(10, 10, 20, 0.8) 100%);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 20px;
  padding: 2.2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.05);
`;

const TopIconsRow = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const MiniBadgeIcon = styled.div`
  padding: 0.6rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.$blue ? 'rgba(0, 102, 255, 0.15)' : 'rgba(0, 242, 254, 0.08)'};
  border: 1px solid ${props => props.$blue ? 'rgba(0, 102, 255, 0.3)' : 'rgba(0, 242, 254, 0.15)'};
  color: ${props => props.$blue ? '#3b82f6' : '#00f2fe'};
`;

const CardHeadingBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const CardMainTitle = styled.h4`
  font-size: 1.7rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.5px;
`;

const CardSubtitle = styled.span`
  font-size: 0.95rem;
  color: #3b82f6;
  font-weight: 600;
`;

const CardParagraph = styled.p`
  color: #9ca3af;
  font-size: 0.95rem;
  line-height: 1.6;
`;

const BadgesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
`;

const TechBadge = styled.span`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  color: #9ca3af;
  padding: 0.4rem 0.9rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const CommunityLink = styled.a`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #3b82f6;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  margin-top: 0.5rem;
  width: fit-content;
  transition: color 0.2s ease;

  &:hover {
    color: #60a5fa;
  }
`;

const ECOSYSTEM_DATA = [
  {
    id: 'comunidade',
    title: 'Comunidade Exclusiva',
    desc: 'Conecte-se com milhares de devs e entusiastas de IA no DevClub + IaClub. O ambiente perfeito para fazer networking, debater códigos e estruturar projetos.',
    icon: Users,
    isNative: true // Flag para identificar que roda em código puro
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
  const currentTab = ECOSYSTEM_DATA[activeTab];

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

          {/* Lado Direito - Preview Condicional (Código vs Imagem) */}
          <DisplaySide>
            <AnimatePresence mode="wait">
              <ContentContainer
                key={activeTab}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3 }}
              >
                {currentTab.isNative ? (
                  /* Renderização Nativa da Comunidade */
                  <NativeCommunityCard>
                    <TopIconsRow>
                      <MiniBadgeIcon $blue>
                        <Code size={18} />
                      </MiniBadgeIcon>
                      <MiniBadgeIcon>
                        <Brain size={18} />
                      </MiniBadgeIcon>
                    </TopIconsRow>
                    
                    <CardHeadingBlock>
                      <CardMainTitle>Programação & IA</CardMainTitle>
                      <CardSubtitle>DevClub + IaClub</CardSubtitle>
                    </CardHeadingBlock>

                    <CardParagraph>
                      Comunidade para desenvolvedores e entusiastas de Inteligência Artificial. Discussões sobre código, projetos, carreira e as últimas novidades em IA.
                    </CardParagraph>

                    <BadgesGrid>
                      <TechBadge>Fórum de discussão</TechBadge>
                      <TechBadge>Networking</TechBadge>
                      <TechBadge>Projetos em grupo</TechBadge>
                      <TechBadge>Dúvidas técnicas</TechBadge>
                    </BadgesGrid>

                    <CommunityLink href="https://aulas.devclub.com.br/comunidade" target='blank'>
                      Acessar Comunidade <ArrowUpRight size={16} />
                    </CommunityLink>
                  </NativeCommunityCard>
                ) : (
                  /* Renderização Padrão das Imagens */
                  <PreviewImage 
                    src={currentTab.image} 
                    alt={currentTab.title} 
                  />
                )}
              </ContentContainer>
            </AnimatePresence>
          </DisplaySide>

        </MainGrid>

      </ContainerWrapper>
    </SectionContainer>
  );
}