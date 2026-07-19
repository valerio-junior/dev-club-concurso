import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import introducaoIaImg from "../assets/introducao-ia.jpg";
import formacaoPromptImg from "../assets/formacao-em-prompt.jpg";
import introducaoN8nImg from "../assets/introducao-n8n.jpg";
import automacoesN8nImg from "../assets/automacoes-n8n.jpg";
import agentesIaImg from "../assets/agentes-de-ia.jpg";
import agentesIaAvancadoImg from "../assets/agentes-de-ia-avancado.jpg";

const SectionContainer = styled.section`
  width: 100%;
  min-height: 100vh;
  background-color: #030308;
  padding: 6rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  overflow: hidden;

  @media (max-width: 1024px) {
    padding: 4rem 2rem;
  }
`;

const TextContent = styled.div`
  max-width: 800px;
  text-align: center;
  margin-bottom: 4rem;
`;

const AnimatedTitle = styled(motion.h3)`
  font-size: 2.2rem;
  font-weight: 900;
  letter-spacing: 1px;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  color: #ffffff;
`;

const Letter = styled(motion.span)`
  display: inline-block;
  background: ${(props) =>
    props.isGlow
      ? "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)"
      : "linear-gradient(135deg, #ffffff 0%, #8b9bb4 100%)"};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  white-space: pre;
`;

const DescriptionText = styled(motion.p)`
  font-size: 1.1rem;
  color: #8b9bb4;
  line-height: 1.8;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

const HorizontalRow = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  max-width: 1200px;
  padding: 1rem;

  @media (max-width: 1100px) {
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: 2rem;

    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

const ImageCard = styled(motion.div)`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  background: #06060c;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.6);
  width: 170px;
  flex-shrink: 0;
  height: auto;
  display: flex;
  aspect-ratio: 9 / 16; /* Garante que os containers tenham a proporção perfeita das imagens */

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 12px;
    padding: 1.5px;
    background: linear-gradient(
      135deg,
      rgba(0, 242, 254, 0.35) 0%,
      rgba(255, 255, 255, 0.03) 100%
    );
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    transition: background 0.4s ease;
    z-index: 4; /* Atualizado para ficar acima dos novos textos */
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
    filter: brightness(1.2) saturate(1.35) contrast(1.05);
  }

  .overlay {
    position: absolute;
    inset: 0;
    /* Ajustado o gradiente para criar uma sombra no topo e no fundo, garantindo a leitura perfeita das letras */
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.65) 0%,
      transparent 25%,
      transparent 55%,
      rgba(3, 3, 8, 0.9) 100%
    );
    transition: background 0.4s ease;
    z-index: 2;
  }

  &:hover {
    &::before {
      background: linear-gradient(135deg, #00f2fe 0%, #eb1e54 100%);
    }

    img {
      transform: scale(1.04);
      filter: brightness(1.25) saturate(1.45) contrast(1.1);
    }

    .overlay {
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.7) 0%,
        transparent 20%,
        transparent 50%,
        rgba(3, 3, 8, 0.95) 100%
      );
    }
  }
`;

/* ================= NOVOS STYLED COMPONENTS PARA OS TEXTOS PEDIDOS ================= */

const CardBrandTop = styled.span`
  position: absolute;
  top: 7%;
  left: 50%;
  transform: translateX(-50%);
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  z-index: 3;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
  pointer-events: none;
`;

const CardBottomWrapper = styled.div`
  position: absolute;
  bottom: 7%;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
  text-align: center;
  z-index: 3;
  pointer-events: none;
`;

const BadgeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  margin-bottom: 6px;
  font-size: 0.75rem;
  letter-spacing: 0.3px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
`;

const BadgeIA = styled.span`
  color: #00e5ff; /* Azul/ciano característico da marca */
  font-weight: 900;
`;

const BadgeClub = styled.span`
  color: #ffffff;
  font-weight: 500;
`;

const CardTitle = styled.h4`
  color: #ffffff;
  font-size: 0.85rem;
  font-weight: 600;
  line-height: 1.3;
  margin: 0;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.9);
`;

const HighlightRed = styled.span`
  color: #eb1e54; /* Vermelho característico do N8N */
  font-weight: 700;
`;

/* ================================================================================= */

const titleContainerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.15, ease: "easeOut" },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.8, 0.25, 1] },
  },
};

export default function AISection() {
  const aiCards = [
    { src: introducaoIaImg, alt: "Introdução a IA" },
    { src: formacaoPromptImg, alt: "Formação em Engenharia de Prompt" },
    { src: introducaoN8nImg, alt: "Introdução ao N8N" },
    { src: automacoesN8nImg, alt: "Automações com N8N" },
    { src: agentesIaImg, alt: "Agentes de IA com N8N" },
    { src: agentesIaAvancadoImg, alt: "Agentes de IA avançados com N8N" },
  ];

  // Função para tratar o texto e pintar dinamicamente o N8N de vermelho
  const formatCardTitle = (title) => {
    if (title.includes("N8N")) {
      const parts = title.split("N8N");
      return (
        <>
          {parts[0]}
          <HighlightRed>N8N</HighlightRed>
          {parts[1]}
        </>
      );
    }
    return title;
  };

  const part1 = "Ecossistema ".split("");
  const part2 = "IA CLUB".split("");

  return (
    <SectionContainer id="ia-section">
      <TextContent>
        <AnimatedTitle
          variants={titleContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          {part1.map((char, index) => (
            <Letter key={`p1-${index}`} variants={letterVariants}>
              {char}
            </Letter>
          ))}
          {part2.map((char, index) => (
            <Letter key={`p2-${index}`} variants={letterVariants} isGlow>
              {char}
            </Letter>
          ))}
        </AnimatedTitle>

        <DescriptionText
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
        >
          Além de formações em desenvolvimento, temos aulas de IA para te deixar
          um profissional completo, dominando o código e a automação com
          ferramentas N8N.
        </DescriptionText>
      </TextContent>

      <HorizontalRow
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {aiCards.map((card, idx) => (
          <ImageCard
            key={idx}
            variants={cardVariants}
            whileHover={{
              y: -8,
              boxShadow: "0 15px 30px rgba(0, 242, 254, 0.25)",
            }}
            whileTap={{ scale: 0.99 }}
          >
            <img src={card.src} alt={card.alt} loading="lazy" />
            <div className="overlay" />
            
            {/* INCLUSÃO CIRÚRGICA DOS TEXTOS INTERNOS SOLICITADOS */}
            <CardBrandTop>DevClub</CardBrandTop>
            
            <CardBottomWrapper>
              <BadgeContainer>
                <BadgeIA>IA</BadgeIA>
                <BadgeClub>CLUB</BadgeClub>
              </BadgeContainer>
              <CardTitle>{formatCardTitle(card.alt)}</CardTitle>
            </CardBottomWrapper>
          </ImageCard>
        ))}
      </HorizontalRow>
    </SectionContainer>
  );
}