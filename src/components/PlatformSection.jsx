import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

import platformImg from "../assets/plataforma-ensino.png";

const ScrollContainer = styled.div`
  height: 130vh;
  background-color: #030308;
  position: relative;
  padding-top: 4rem;
`;

const StickyWrapper = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 6rem 2rem 2rem; /* Proteção generosa de 6rem no topo contra cortes */
`;

const ContentLayout = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const TextBlock = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  z-index: 2;
  width: 100%;
  max-width: 480px;
  align-items: center;
`;

const Badge = styled.span`
  background: rgba(127, 0, 255, 0.1);
  border: 1px solid rgba(127, 0, 255, 0.3);
  padding: 0.4rem 1.2rem;
  border-radius: 50px;
  color: #a855f7;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  width: fit-content;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 900;
  color: #ffffff;
  line-height: 1.2;

  span {
    background: linear-gradient(to right, #7f00ff, #00f2fe);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (min-width: 968px) {
    font-size: 2.3rem;
  }
`;

const Description = styled.p`
  color: #8b949e;
  font-size: 0.98rem;
  line-height: 1.6;
`;

const ImageWrapper = styled(motion.div)`
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  max-width: 580px; /* Tamanho ajustado para caber perfeitamente na tela */
`;

const PlatformImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 20px;
  max-height: 420px;
  object-fit: contain;
  filter: drop-shadow(0 25px 50px rgba(0, 0, 0, 0.8));
`;

export default function PlatformSection() {
  const containerRef = useRef(null);

  // 1. Mudamos o offset para capturar a entrada do elemento na tela
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"], // <--- 'start end' é o segredo!
  });

  // 💡 Criamos um progresso "suavizado" usando física de mola
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100, // Rigidez da resposta (quanto menor, mais suave)
    damping: 30, // Amortecimento (evita que fique balançando no final)
    restDelta: 0.001,
  });

  // 2. Com o 0.0, a troca DINÂMICA começa IMEDIATAMENTE ao chegar na sessão
  // O segundo número (ex: 0.25) define onde ela termina de trocar.
  const INICIO = 0.4;
  const FIM = 0.6;

  const textX = useTransform(smoothProgress, [INICIO, FIM], ["0%", "-55%"]);
  const imageX = useTransform(smoothProgress, [INICIO, FIM], ["0%", "42%"]);

  const textY = useTransform(smoothProgress, [INICIO, FIM], ["0px", "250px"]);
  const imageY = useTransform(smoothProgress, [INICIO, FIM], ["0px", "-40px"]);

  const textAlign = useTransform(
    smoothProgress,
    [INICIO, FIM],
    ["center", "left"],
  );
  const imageScale = useTransform(smoothProgress, [INICIO, FIM], [0.9, 1]);

  return (
    <ScrollContainer ref={containerRef}>
      <StickyWrapper>
        <ContentLayout>
          {/* Bloco de Texto */}
          <TextBlock
            style={{
              x: textX,
              y: textY,
              textAlign: textAlign,
            }}
          >
            <Badge>EXPERIÊNCIA DE APRENDIZADO</Badge>
            <Title>
              Plataforma de <span>Ensino Exclusiva</span>
            </Title>
            <Description>
              Você terá uma plataforma de aula com uma trilha do básico ao
              avançado com a melhor didática do mercado, guiada pelo nosso
              mentor Rodolfo Mori.
            </Description>
          </TextBlock>

          {/* Imagem da Plataforma */}
          <ImageWrapper
            style={{
              x: imageX,
              y: imageY,
              scale: imageScale,
            }}
          >
            <PlatformImage
              src={platformImg}
              alt="Plataforma de Ensino DevClub"
            />
          </ImageWrapper>
        </ContentLayout>
      </StickyWrapper>
    </ScrollContainer>
  );
}
