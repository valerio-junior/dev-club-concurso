import React, { useState, useRef } from "react";
import styled from "styled-components";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

import imgFernanda from "../assets/fernanda-mentora.jpg"
import imgHenrique from "../assets/henrique-mentor.jpg"
import imgRodolfo from "../assets/rodolfo-ceo.jpg"
import imgJuliana from "../assets/juliana-recruter.jpg"
import imgMateus from "../assets/mateus-ia.jpg"

// --- Dados dos Professores ---
const teachersData = [
  {
    id: 1,
    name: "Rodolfo Mori",
    role: "Fundador & CEO",
    specialty: "Full Stack & Carreira Dev",
    image:
      imgRodolfo,
    bio: "De ex eletricista, a um dos maiores profissionais, mentores e palestrantes da área da tecnologia, sua didática e profissionalismo vai além de só ensinar código. ",
    linkedin: "https://www.linkedin.com/in/rodolfomori/",
    instagram: "https://www.instagram.com/rodolfomorii/",
  },
  {
    id: 2,
    name: "Marcio Conceição",
    role: "Mentor & Instrutor",
    specialty: "Terapeuta e mentor",
    image:
      "https://portalna.com.br/images/noticias/136713/c47248cffc4109e645c4f7673a2a2c9a.webp",
    bio: "Marcio vivia cheio de conflitos internos e problemas que não sabia como resolver, e em busca de auto conhecimento, e com isso pegou amor a terapia e vem mudando milhares de vidas.",
    linkedin: "https://www.linkedin.com/in/m%C3%A1rcio-conce%C3%AC%C3%A7%C3%A3o-b7364859/",
    instagram: "https://www.instagram.com/marcioaconceicao/",
  },
  {
    id: 3,
    name: "Fernanda Costa",
    role: "Recrutadora e mentora profissional",
    specialty: "Orientação profissional e transição de carreira",
    image:
      imgFernanda,
    bio: "Fernanda é um exemplo que devemos arriscar e sair da nossa zona de conforto, com mais de 10 anos de CLT arriscou e, começou a empreender e direcionar profissionais em sua carreira, com mentorias.",
    linkedin: "https://www.linkedin.com/in/fernandacostacarreira/",
    instagram: "https://www.instagram.com/fernandacostacarreira/",
  },
  {
    id: 4,
    name: "Henrique Francisco",
    role: "Mentor Técnico",
    specialty: "Programado Full-stack",
    image:
      imgHenrique,
    bio: "Desenvolvedor Full-Stack com mais de 4 anos de experiência dedicados a transformar ideias em soluções digitais, utilizando as melhores ferramentas do mercado",
    linkedin: "https://www.linkedin.com/in/henrique-francisco-souza/",
    instagram: "https://www.instagram.com/henrique_o_francisco/",
  },
  {
    id: 5,
    name: "Juliana Nunes",
    role: "Recrutadora & RH",
    specialty: "Soft Skills e LinkedIn",
    image:
      imgJuliana,
    bio: "Especialista em recrutamento para a área de tecnologia. Prepara os alunos para entrevistas, otimização de perfil no LinkedIn e simulações de RH.",
    linkedin: "https://www.linkedin.com/in/nuness-juliana/?locale=pt",
    instagram: "https://www.instagram.com/juhnunestipo1?igsh=cnk1bm94dHFieWkx&utm_source=qr",
  },
  {
    id: 6,
    name: "Mateus Nogueira",
    role: "Mentor DevClub",
    specialty: "Projetos Práticos & Código",
    image:
      imgMateus,
    bio: "Especialista em metodologia mão na massa. Atua guiando os estudantes na construção de projetos completos e portfólios competitivos, com ferramentas de IA para construção de códigos e agentes de IA.",
    linkedin: "https://www.linkedin.com/in/mateus-nogueira-10b519281/",
    instagram: "https://www.instagram.com/mateus.nnogueira/",
  },
];

// --- Styled Components ---

/* Container Pai que gera o comprimento da rolagem para a travamento (Pinning) */
const ScrollSection = styled.div`
  position: relative;
  height: 320vh; /* Controla o tempo de travamento na tela */
  background-color: #030308;
`;

/* Container fixado que trava a visão enquanto o scroll acontece */
const StickyViewport = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Centraliza verticalmente o conteúdo */
  overflow: hidden;

  /* ADICIONADO: Respiros verticais seguros para garantir que NADA corte */
  padding-top: 4vh;
  padding-bottom: 8vh; /* Espaço extra embaixo para as bordas e sombras */
`;

const HeaderBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.8rem;
  max-width: 800px;
  padding: 0 1.5rem;
  z-index: 5;
  margin-bottom: 2.5rem;

  &::before {
    content: "";
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, #7f00ff, #00f2fe);
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 242, 254, 0.6);
  }
`;

const Badge = styled.span`
  background: rgba(127, 0, 255, 0.12);
  border: 1px solid rgba(127, 0, 255, 0.35);
  padding: 0.4rem 1.2rem;
  border-radius: 50px;
  color: #a855f7;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const Title = styled.h2`
  font-size: clamp(2rem, 4vw, 2rem);
  font-weight: 900;
  color: #ffffff;
  line-height: 1.2;

  span {
    background: linear-gradient(135deg, #a855f7 0%, #00f2fe 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 0 20px rgba(0, 242, 254, 0.25));
  }
`;

const Subtitle = styled.p`
  color: #94a3b8;
  font-size: 1rem;
  font-weight: 400;
  max-width: 600px;
`;

/* Container Horizontal do Carrossel */
const TrackViewport = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  overflow: visible; /* Garante que a borda e o brilho inferior do card apareçam */
  padding-bottom: 1.5rem; /* Respiro essencial para a borda inferior */
`;

const HorizontalTrack = styled(motion.div)`
  display: flex;
  gap: 2rem;
  /* Mantido o alinhamento da esquerda e ajustado o respiro inferior */
  padding: 1.5rem 5vw 2.5rem 2.5rem;
  align-items: center;
`;

/* 3. Card do Professor (Altura levemente ajustada para não estourar a tela) */
const Card = styled(motion.div)`
  background: rgba(13, 17, 26, 0.85);
  border: 1px solid
    ${(props) =>
      props.$isExpanded
        ? "rgba(0, 242, 254, 0.6)"
        : "rgba(255, 255, 255, 0.1)"};
  border-radius: 28px;
  backdrop-filter: blur(20px);
  width: 340px;
  height: 440px; /* Reduzido levemente para encaixar em qualquer resolução sem cortar o fundo */
  flex-shrink: 0;
  padding: 1.8rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: ${(props) =>
    props.$isExpanded ? "flex-start" : "flex-end"};
  box-shadow: ${(props) =>
    props.$isExpanded
      ? "0 20px 40px rgba(0, 242, 254, 0.2)"
      : "0 10px 30px rgba(0, 0, 0, 0.6)"};
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    border-color: rgba(168, 85, 247, 0.6);
  }

  @media (max-height: 800px) {
    height: 400px; /* Ajuste automático para telas com menor altura */
    width: 310px;
  }
`;

/* Imagem Grande (Modo Padrão) / Pequena (Modo Expandido) */
const TeacherImage = styled(motion.img)`
  position: absolute;
  object-fit: cover;
  border-radius: 20px;

  ${(props) =>
    props.$isExpanded
      ? `
    top: 1.5rem;
    left: 1.5rem;
    width: 80px;
    height: 80px;
    border: 2px solid #00f2fe;
    box-shadow: 0 0 15px rgba(0, 242, 254, 0.4);
  `
      : `
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    filter: brightness(0.85);
  `}
`;

/* Overlay gradiente para legibilidade no modo fechado */
const GradientOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    transparent 40%,
    rgba(3, 3, 8, 0.95) 100%
  );
  pointer-events: none;
`;

/* Container de Conteúdo do Card Fechado */
const CompactContent = styled(motion.div)`
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

/* Container do Conteúdo Expandido com Descrição */
const ExpandedContent = styled(motion.div)`
  z-index: 2;
  margin-top: 6.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  height: calc(100% - 6.5rem); /* Ocupa 100% do espaço restante abaixo da foto */
  justify-content: space-between; /* Empurra os links sociais para o final do card */
`;

const Name = styled.h3`
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0;
`;

const RoleBadge = styled.span`
  color: #00f2fe;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Specialty = styled.p`
  color: #94a3b8;
  font-size: 0.9rem;
  margin: 0;
`;

const BioText = styled.p`
  color: #e2e8f0;
  font-size: 0.88rem;
  line-height: 1.5;
  font-weight: 300;
  background: rgba(255, 255, 255, 0.03);
  padding: 0.8rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  
  /* Permite scroll se o texto for muito grande */
  max-height: 170px;
  overflow-y: auto;

  /* Estilização da barra de rolagem */
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.02);
  }
  &::-webkit-scrollbar-thumb {
    background: #00f2fe;
    border-radius: 10px;
  }
`;

const ClickHint = styled.span`
  color: #a855f7;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.2rem;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);

  a {
    color: #00f2fe;
    font-size: 0.85rem;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.2s ease;

    &:hover {
      color: #a855f7;
      transform: translateY(-2px);
    }
  }
`;

// --- Componente Principal ---
export default function TeachersTech() {
  const targetRef = useRef(null);
  const [expandedCardId, setExpandedCardId] = useState(null);

  // Escuta a rolagem dentro da seção específica
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Transforma a rolagem vertical de 0% a 100% no movimento X da esquerda para a direita
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);

  const handleCardClick = (id) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  return (
    <ScrollSection ref={targetRef}>
      <StickyViewport>
        {/* Título Centralizado */}
        <HeaderBlock>
          <Badge>NOSSO TIME DE ELITE</Badge>
          <Title>
            Aprenda com quem <span>vive o mercado</span>
          </Title>
          <Subtitle>
            Aprenda direto com profissionais ativos que enfrentam os mesmos
            desafios que você encontrará no mercado de tecnologia.
          </Subtitle>
        </HeaderBlock>

        {/* Trilho Horizontal Mover pelo Scroll */}
        <TrackViewport>
          <HorizontalTrack style={{ x }}>
            {teachersData.map((teacher) => {
              const isExpanded = expandedCardId === teacher.id;

              return (
                <Card
                  key={teacher.id}
                  layout
                  $isExpanded={isExpanded}
                  onClick={() => handleCardClick(teacher.id)}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  {/* Foto do Professor (Morphing Dinâmico) */}
                  <TeacherImage
                    layout
                    src={teacher.image}
                    alt={teacher.name}
                    $isExpanded={isExpanded}
                  />

                  {!isExpanded && <GradientOverlay layout />}

                  {/* Visualização Padrão Fechada */}
                  {!isExpanded && (
                    <CompactContent layout>
                      <RoleBadge>{teacher.role}</RoleBadge>
                      <Name>{teacher.name}</Name>
                      <Specialty>{teacher.specialty}</Specialty>
                      <ClickHint>Clique para saber mais ➔</ClickHint>
                    </CompactContent>
                  )}

                  {/* Visualização Expandida (Descrição + Foto Pequena no Canto) */}
                  {isExpanded && (
                    <ExpandedContent
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div>
                        <Name>{teacher.name}</Name>
                        <RoleBadge>{teacher.role}</RoleBadge>
                      </div>

                      <BioText>{teacher.bio}</BioText>

                      <SocialLinks>
                        <a
                          href={teacher.linkedin}
                          target="_blank"
                          rel="noreferrer"
                        >
                          LinkedIn
                        </a>
                        <a
                          href={teacher.instagram}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Instagram
                        </a>
                      </SocialLinks>
                    </ExpandedContent>
                  )}
                </Card>
              );
            })}
          </HorizontalTrack>
        </TrackViewport>
      </StickyViewport>
    </ScrollSection>
  );
}
