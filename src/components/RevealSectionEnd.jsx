import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

// --- Styled Components ---

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  background: radial-gradient(circle at center, #0d121f 0%, #030308 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  user-select: none;
`;

/* Container mantendo as letras BEM JUNTAS como no layout original */
const WordWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.1rem;
  padding: 0 1rem;

  @media (min-width: 768px) {
    gap: 0.4rem;
    padding: 0 2rem;
  }
`;

const LetterBox = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  will-change: transform;
`;

const LetterText = styled.span`
  font-size: clamp(4.5rem, 16vw, 22rem);
  font-weight: 900;
  font-family:
    "Inter",
    system-ui,
    -apple-system,
    sans-serif;
  letter-spacing: -0.05em;
  line-height: 0.9;
  text-transform: uppercase;

  background: linear-gradient(180deg, #ffffff 0%, #60a5fa 50%, #1e40af 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.8))
    drop-shadow(0 0 35px rgba(59, 130, 246, 0.4));
`;

/* Cursor posicionado em relação ao grupo de letras juntas */
const MovingCursor = styled(motion.div)`
  position: absolute;
  top: 180%;
  left: 50%;
  z-index: 50;
  pointer-events: none;
  display: flex;
  align-items: center;
  gap: 6px;
  transform: translate(-50%, -50%);
  will-change: left, top;
`;

const MousePointer = styled.svg`
  width: 24px;
  height: 24px;
  fill: #3b82f6;
  filter: drop-shadow(0 2px 10px rgba(0, 0, 0, 0.8));
`;

const RodolfoBadge = styled.div`
  background: #2563eb;
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 800;
  padding: 0.3rem 0.7rem;
  border-radius: 6px;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.5);
  white-space: nowrap;
`;

// --- Componente Principal ---

export default function RevealSectionDevClub() {
  /*
    Com as letras juntas:
    - Letra D (1ª letra): ~7% da largura da palavra
    - Letra C (4ª letra): ~50% (Centro da palavra DEVCLUB)
  */

  const timeline = [0, 0.12, 0.22, 0.38, 0.48, 0.62, 0.72, 0.86, 0.96, 1];

  // Animação do Cursor
  const cursorVariants = {
    animate: {
      left: [
        "50%", // Posição inicial (Centro)
        "7%", // Pousa DENTRO da letra D
        "7%", // Puxa a letra D para cima
        "50%", // Trajeto e pouso DENTRO da letra C
        "50%", // Puxa a letra C para cima
        "7%", // Trajeto até a letra D (no alto)
        "7%", // Empurra a letra D para baixo
        "50%", // Trajeto até a letra C (no alto)
        "50%", // Empurra a letra C para baixo
        "50%", // Retorna ao centro
      ],
      top: [
        "180%", // Fora/abaixo
        "50%", // Encaixa direto na letra D (ajustado para referência ao wrapper)
        "18%", // Sobe junto com a letra D
        "50%", // Encaixa direto na letra C
        "18%", // Sobe junto com a letra C
        "18%", // Pousa no topo da letra D alta
        "50%", // Empurra a letra D de volta para baixo
        "18%", // Pousa no topo da letra C alta
        "50%", // Empurra a letra C de volta para baixo
        "180%", // Volta para baixo
      ],
      transition: {
        duration: 16,
        repeat: Infinity,
        repeatDelay: 0.8,
        ease: "easeInOut",
        times: timeline,
      },
    },
  };

  // Animação da Letra "D"
  const letterDVariants = {
    animate: {
      scale: [1, 1, 1.25, 1.25, 1.25, 1.25, 1, 1, 1, 1],
      y: [0, 0, -35, -35, -35, -35, 0, 0, 0, 0],
      transition: {
        duration: 16,
        repeat: Infinity,
        repeatDelay: 0.8,
        ease: "easeInOut",
        times: timeline,
      },
    },
  };

  // Animação da Letra "C"
  const letterCVariants = {
    animate: {
      scale: [1, 1, 1, 1, 1.25, 1.25, 1.25, 1.25, 1, 1],
      y: [0, 0, 0, 0, -35, -35, -35, -35, 0, 0],
      transition: {
        duration: 16,
        repeat: Infinity,
        repeatDelay: 0.8,
        ease: "easeInOut",
        times: timeline,
      },
    },
  };

  // Refs para medir posições das letras
  const wrapperRef = useRef(null);
  const dRef = useRef(null);
  const cRef = useRef(null);
  const cursorRef = useRef(null);

  const [cursorAnim, setCursorAnim] = useState(null);

  useEffect(() => {
    function compute() {
      const wrapper = wrapperRef.current;
      const dEl = dRef.current;
      const cEl = cRef.current;
      if (!wrapper || !dEl || !cEl) return;

      const wRect = wrapper.getBoundingClientRect();
      const dRect = dEl.getBoundingClientRect();
      const cRect = cEl.getBoundingClientRect();

      const wrapperWidth = wRect.width;
      const wrapperHeight = wRect.height;


      const dCenterX = dRect.left - wRect.left + dRect.width / 2;
      const cCenterX = cRect.left - wRect.left + cRect.width / 2;

      const dCenterY = dRect.top - wRect.top + dRect.height / 2;
      const cCenterY = cRect.top - wRect.top + cRect.height / 2;

      const offscreenY = wrapperHeight + 120; // posição inicial/final abaixo
      const raiseAmount = 35; // deve corresponder ao translate y usado nas letras

      // Ajuste vertical para alinhar o cursor à linha superior das letras
      const cursorHeight = cursorRef.current ? cursorRef.current.getBoundingClientRect().height : 24;
      const cursorOffset = Math.max(4, Math.round(cursorHeight * 0.15));
      const extraOffset = 0; // base: sem deslocamento global
      const totalCursorOffset = cursorOffset + extraOffset;
      const dSpecificAdjust = -48; // sobe o cursor mais 48px quando sobre a letra D
      const cSpecificAdjust = -6; // sobe o cursor 6px quando sobre a letra C

      // Valores de y e scale usados nas letras (mesmos frames da timeline)
      const letterDY_D = [0, 0, -35, -35, -35, -35, 0, 0, 0, 0];
      const letterDY_C = [0, 0, 0, 0, -35, -35, -35, -35, 0, 0];
      const letterScaleD = [1, 1, 1.25, 1.25, 1.25, 1.25, 1, 1, 1, 1];
      const letterScaleC = [1, 1, 1, 1, 1.25, 1.25, 1.25, 1.25, 1, 1];

      const dScaleOffsets = letterScaleD.map((s) => (s - 1) * (dRect.height / 2));
      const cScaleOffsets = letterScaleC.map((s) => (s - 1) * (cRect.height / 2));

      const leftVals = [
        wrapperWidth / 2,
        dCenterX,
        dCenterX,
        cCenterX,
        cCenterX,
        dCenterX,
        dCenterX,
        cCenterX,
        cCenterX,
        wrapperWidth / 2,
      ];

      const lefts = leftVals.map((v) => `${v}px`);

      const topsVals = leftVals.map((baseX, idx) => {
        if (idx === 0 || idx === leftVals.length - 1) return offscreenY;

        let baseY = wrapperHeight / 2;
        let yShift = 0;
        let scaleOffset = 0;

        // subtrai scaleOffset para subir o cursor quando a letra aumenta
        if (baseX === dCenterX) {
          baseY = dCenterY;
          yShift = letterDY_D[idx];
          scaleOffset = dScaleOffsets[idx] || 0;
          return baseY + yShift + (totalCursorOffset + dSpecificAdjust) - scaleOffset;
        } else if (baseX === cCenterX) {
          baseY = cCenterY;
          yShift = letterDY_C[idx];
          scaleOffset = cScaleOffsets[idx] || 0;
           return baseY + yShift + (totalCursorOffset + cSpecificAdjust) - scaleOffset;
        }

        return baseY + yShift + totalCursorOffset - scaleOffset;
      });

      const tops = topsVals.map((v) => `${v}px`);

      setCursorAnim({ left: lefts, top: tops });
    }

    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return (
    <Container>
      <WordWrapper ref={wrapperRef}>
        {/* CURSOR VISÍVEL E ALINHADO DENTRO DAS LETRAS */}
        <MovingCursor
          ref={cursorRef}
          variants={cursorAnim ? { animate: { left: cursorAnim.left, top: cursorAnim.top, transition: { duration: 16, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut", times: timeline, }, }, } : cursorVariants}
          animate="animate"
        >
          <MousePointer viewBox="0 0 24 24">
            <path d="M3 3l7 18 3-7 7-3L3 3z" />
          </MousePointer>
          <RodolfoBadge>Rodolfo</RodolfoBadge>
        </MovingCursor>

        {/* LETRAS AGRUPADAS E COMPACTAS */}
        <LetterBox ref={dRef} variants={letterDVariants} animate="animate">
          <LetterText>D</LetterText>
        </LetterBox>

        <LetterBox>
          <LetterText>E</LetterText>
        </LetterBox>
        <LetterBox>
          <LetterText>V</LetterText>
        </LetterBox>

        <LetterBox ref={cRef} variants={letterCVariants} animate="animate">
          <LetterText>C</LetterText>
        </LetterBox>

        <LetterBox>
          <LetterText>L</LetterText>
        </LetterBox>
        <LetterBox>
          <LetterText>U</LetterText>
        </LetterBox>
        <LetterBox>
          <LetterText>B</LetterText>
        </LetterBox>
      </WordWrapper>
    </Container>
  );
}
