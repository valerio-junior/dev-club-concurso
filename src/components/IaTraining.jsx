import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";


import introducaoIaImg from "../assets/introducao-ia.png";
import formacaoPromptImg from "../assets/formacao-em-prompt.png";
import introducaoN8nImg from "../assets/introducao-n8n.png";
import automacoesN8nImg from "../assets/automacoes-n8n.png";
import agentesIaImg from "../assets/agentes-de-ia.png";
import agentesIaAvancadoImg from "../assets/agentes-de-ia-avancado.png";

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

// Título configurado para comportar as letras lado a lado sem quebrar
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

// Estilização individual para cada letra/palavra animada
const Letter = styled(motion.span)`
  display: inline-block;
  background: ${(props) =>
    props.isGlow
      ? "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)"
      : "linear-gradient(135deg, #ffffff 0%, #8b9bb4 100%)"};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  white-space: pre; /* Preserva os espaços em branco entre as palavras */
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
  background: rgba(255, 255, 255, 0.01);
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.5);
  width: 170px;
  flex-shrink: 0;
  height: auto;
  display: flex;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 12px;
    padding: 1.5px;
    background: linear-gradient(
      135deg,
      rgba(0, 242, 254, 0.25) 0%,
      rgba(255, 255, 255, 0.03) 100%
    );
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    transition: background 0.4s ease;
    z-index: 2;
  }

  img {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(3, 3, 8, 0.3) 0%, transparent 60%);
    transition: background 0.4s ease;
    z-index: 1;
  }

  &:hover {
    &::before {
      background: linear-gradient(135deg, #00f2fe 0%, #7f00ff 100%);
    }

    img {
      transform: scale(1.04);
    }

    .overlay {
      background: linear-gradient(
        to top,
        rgba(3, 3, 8, 0.1) 0%,
        transparent 100%
      );
    }
  }
`;

// Variantes da animação de máquina de escrever
const titleContainerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      // Aumentado para 0.09s para o usuário ver nitidamente cada letra surgindo
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

  // Separando o texto em caracteres para animar um por um
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
          </ImageCard>
        ))}
      </HorizontalRow>
    </SectionContainer>
  );
}
