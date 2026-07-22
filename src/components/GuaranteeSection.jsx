import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

// --- Styled Components ---

const SectionContainer = styled.section`
  background-color: #030308;
  padding: 6rem 6%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky; /* Torna a garantia fixa durante a rolagem */
  top: 0;
  min-height: 100vh;
  z-index: 1; /* Fica no plano de fundo */
  overflow: hidden;
`;

const BackgroundGlow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(
    circle,
    rgba(37, 99, 235, 0.12) 0%,
    rgba(3, 3, 8, 0) 70%
  );
  pointer-events: none;
  z-index: 1;
`;

/* Container Principal em Flexbox Horizontal */
const GuaranteeCard = styled(motion.div)`
  max-width: 1050px;
  width: 100%;
  background: rgba(13, 17, 26, 0.85);
  border: 1px solid rgba(59, 130, 246, 0.25);
  border-radius: 24px;
  padding: 3.5rem;
  backdrop-filter: blur(16px);

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4rem;

  position: relative;
  z-index: 2;
  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.5),
    0 0 40px rgba(37, 99, 235, 0.1);

  @media (max-width: 900px) {
    flex-direction: column;
    padding: 2.5rem 1.8rem;
    gap: 2.5rem;
  }
`;

/* Bloco Esquerdo: Selo Circular de Garantia */
const SealContainer = styled.div`
  flex-shrink: 0;
  width: 280px;
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  @media (max-width: 900px) {
    width: 220px;
    height: 220px;
  }
`;

const SealGlow = styled.div`
  position: absolute;
  width: 110%;
  height: 110%;
  background: radial-gradient(
    circle,
    rgba(59, 130, 246, 0.2) 0%,
    transparent 70%
  );
  filter: blur(20px);
  z-index: 0;
`;

/* Bloco Direito: Informações da Garantia */
const ContentBlock = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;

  @media (max-width: 900px) {
    align-items: center;
    text-align: center;
  }
`;

const Badge = styled.span`
  background: rgba(30, 58, 138, 0.3);
  border: 1px solid rgba(59, 130, 246, 0.4);
  padding: 0.4rem 1.2rem;
  border-radius: 50px;
  color: #60a5fa;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 1.2rem;
`;

const Title = styled.h2`
  font-size: clamp(1.8rem, 2.5vw, 2.2rem);
  font-weight: 900;
  color: #ffffff;
  margin-bottom: 1rem;
  line-height: 1.25;

  span {
    background: linear-gradient(135deg, #60a5fa 0%, #1d4ed8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Description = styled.p`
  color: #9ca3af;
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 2rem;
  max-width: 600px;
`;

/* Checklist com ícones */
const FeaturesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  width: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 1.8rem;

  @media (max-width: 900px) {
    justify-content: center;
  }
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: #e5e7eb;
  font-size: 0.9rem;
  font-weight: 600;

  svg {
    width: 18px;
    height: 18px;
    color: #3b82f6;
    flex-shrink: 0;
  }
`;

export default function GuaranteeDevClub() {
  return (
    <SectionContainer>
      <BackgroundGlow />

      <GuaranteeCard
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* LADO ESQUERDO: Selo com Textos Espelhados em Eixo Horizontal */}
        <SealContainer>
          <SealGlow />

          <svg
            viewBox="0 0 300 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              zIndex: 1,
            }}
          >
            <defs>
              {/* Gradiente Azul das Linhas Circulares */}
              <linearGradient
                id="blueRingGrad"
                x1="0"
                y1="0"
                x2="300"
                y2="300"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>

              {/* Fundo do Brasão no centro */}
              <linearGradient
                id="shieldCenterBg"
                x1="150"
                y1="100"
                x2="150"
                y2="200"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>

              {/* Guia Circular DIREITA (De Cima pra Baixo, do topo ao fundo) */}
              <path id="rightTextPath" d="M 150 40 A 110 110 0 0 1 150 260" />

              {/* Guia Circular ESQUERDA (De Cima pra Baixo, do topo ao fundo) */}
              <path id="leftTextPath" d="M 150 260 A 110 110 0 0 1 150 40" />
            </defs>

            {/* 1. LINHA / CÍRCULO EXTERNO ("O" GRANDE SÓLIDO) */}
            <circle
              cx="150"
              cy="150"
              r="138"
              stroke="url(#blueRingGrad)"
              strokeWidth="2"
            />

            {/* 2. TEXTO DIREITA: "GARANTIA INCONDICIONAL" */}
            <text
              fill="#60a5fa"
              fontSize="9"
              fontWeight="900"
              letterSpacing="2.2"
            >
              <textPath
                href="#rightTextPath"
                startOffset="50%"
                textAnchor="middle"
              >
                • GARANTIA INCONDICIONAL •
              </textPath>
            </text>

            {/* 3. TEXTO ESQUERDA: "GARANTIA INCONDICIONAL" (Espelhado na mesma linha) */}
            <text
              fill="#60a5fa"
              fontSize="9"
              fontWeight="900"
              letterSpacing="2.2"
            >
              <textPath
                href="#leftTextPath"
                startOffset="50%"
                textAnchor="middle"
              >
                • GARANTIA INCONDICIONAL •
              </textPath>
            </text>

            {/* 4. LINHA / CÍRCULO INTERNO ("O" MENOR) */}
            <circle
              cx="150"
              cy="150"
              r="82"
              stroke="url(#blueRingGrad)"
              strokeWidth="2"
            />

            {/* Fundo sutil do centro */}
            <circle cx="150" cy="150" r="80" fill="#030712" fillOpacity="0.6" />

            {/* 5. BRASÃO MENORZINHO NO CENTRO */}
            <g transform="translate(150, 148) scale(0.65)">
              <path
                d="M 0 -65 L 48 -40 V 10 C 48 50 20 80 0 92 C -20 80 -48 50 -48 10 V -40 L 0 -65 Z"
                fill="url(#shieldCenterBg)"
                stroke="url(#blueRingGrad)"
                strokeWidth="3.5"
              />

              <path
                d="M 0 -52 L 38 -32 V 8 C 38 40 16 65 0 76 C -16 65 -38 40 -38 8 V -32 L 0 -52 Z"
                fill="none"
                stroke="#60a5fa"
                strokeOpacity="0.4"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />

              <path
                d="M -15 2 L -5 12 L 18 -12"
                stroke="#60a5fa"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <text
                x="0"
                y="48"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="16"
                fontWeight="900"
                letterSpacing="1.5"
              >
                7 DIAS
              </text>
            </g>
          </svg>
        </SealContainer>

        {/* LADO DIREITO: Informações da Garantia */}
        <ContentBlock>
          <Badge>Garantia Incondicional</Badge>

          <Title>
            Sua satisfação garantida ou <span>100% do dinheiro de volta</span>
          </Title>

          <Description>
            Tenho absoluta confiança na qualidade do material. Se nos primeiros
            7 dias você entender que o conteúdo não atendeu às suas
            expectativas, basta solicitar o reembolso com apenas um clique.
            Devolvemos todo o seu investimento, sem burocracia e sem perguntas.
          </Description>

          <FeaturesGrid>
            <FeatureItem>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              7 Dias de Teste
            </FeatureItem>

            <FeatureItem>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              Reembolso Integral
            </FeatureItem>

            <FeatureItem>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              Sem Perguntas
            </FeatureItem>
          </FeaturesGrid>
        </ContentBlock>
      </GuaranteeCard>
    </SectionContainer>
  );
}
