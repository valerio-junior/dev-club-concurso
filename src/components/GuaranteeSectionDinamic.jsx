import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// --- Styled Components ---

const Wrapper = styled.div`
  position: sticky; /* IMPORTANTE: Mantém fixa para a FAQ subir por cima */
  top: 0;
  background-color: #030308;
  z-index: 2; /* Fica acima da Seção 1 (Garantia) */
  min-height: 100vh;
  margin-top: -10vh; /* Encaixa suavemente em cima da garantia */
`;

/* Seção de Garantia (Fixa no fundo) */
const StickyGuarantee = styled(motion.section)`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #06060f;
  padding: 2rem 6%;
  text-align: center;
  will-change: transform, opacity;
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  box-shadow: 0 -25px 50px rgba(0, 0, 0, 0.95);
`;

const GuaranteeTitle = styled.h2`
  font-size: clamp(2rem, 3.5vw, 2rem);
  font-weight: 900;
  color: #ffffff;
  margin-bottom: 1rem;

  span {
    background: linear-gradient(135deg, #60a5fa 0%, #1d4ed8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const GuaranteeDescription = styled.p`
  color: #9ca3af;
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 600px;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const DynamicContent = styled(motion.div)`
  position: relative;
  z-index: 2;
  will-change: transform;
`;

export default function GuaranteeDevClubDinamic({ children }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 15,
    mass: 0.8,
    restDelta: 0.0001,
  });

  const guaranteeScale = useTransform(smoothProgress, [0, 0.75], [1, 0.85]);
  const guaranteeOpacity = useTransform(smoothProgress, [0, 0.75], [1, 0.1]);
  const guaranteeY = useTransform(smoothProgress, [0, 0.75], ["0px", "-40px"]);

  const faqY = useTransform(smoothProgress, [0, 0.75], ["40px", "0px"]);

  return (
    <Wrapper ref={containerRef}>
      <StickyGuarantee
        style={{
          scale: guaranteeScale,
          opacity: guaranteeOpacity,
          y: guaranteeY,
        }}
      >
        <GuaranteeTitle><span>Garantia Incondicional</span> de 7 Dias</GuaranteeTitle>
        <GuaranteeDescription>
          Teste todo o conteúdo, acesse as mentorias e ferramentas. Se achar que
          não é para você, devolvemos 100% do seu investimento.
        </GuaranteeDescription>
      </StickyGuarantee>

      <DynamicContent style={{ y: faqY }}>{children}</DynamicContent>
    </Wrapper>
  );
}
