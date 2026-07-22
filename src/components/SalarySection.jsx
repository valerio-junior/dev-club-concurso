import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// --- Styled Components ---

const ScrollContainer = styled.div`
  height: 300vh;
  background-color: #030308;
  position: relative;
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
  padding: 2rem 6%;
`;

const DashboardContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

/* Cabeçalho alinhado à esquerda com o título em 2rem */
const HeaderBlock = styled.div`
  text-align: left;
  max-width: 600px;
`;

const Badge = styled.span`
  background: rgba(30, 58, 138, 0.2);
  border: 1px solid rgba(59, 130, 246, 0.3);
  padding: 0.4rem 1.2rem;
  border-radius: 50px;
  color: #60a5fa;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const Title = styled.h2`
  font-size: clamp(2rem, 3.5vw, 2rem);
  font-weight: 900;
  color: #ffffff;
  margin-top: 1rem;

  span {
    background: linear-gradient(135deg, #60a5fa 0%, #1d4ed8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Subtitle = styled.p`
  color: #8b949e;
  font-size: 0.95rem;
  margin-top: 0.8rem;
  line-height: 1.6;
`;

/* Estrutura Principal: Coluna na esquerda e Gráfico solto na direita */
const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 3.5rem;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

/* Colunas dos Profissionais e Valores */
const ProfessionalsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  z-index: 2;
`;

const ProfessionalRow = styled.div`
  background: rgba(13, 17, 26, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 1.2rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(16px);
`;

const LevelTag = styled.span`
  color: #60a5fa;
  font-size: 0.9rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

const SalaryValue = styled.div`
  font-size: 1.6rem;
  font-weight: 900;
  color: #ffffff;
  font-variant-numeric: tabular-nums;
`;

/* Gráfico Solto no Body (Sem Container de fundo) */
const GraphWrapper = styled.div`
  width: 100%;
  height: 320px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SVGChart = styled.svg`
  width: 100%;
  height: 100%;
  overflow: visible;
`;

// Helper para formatar moeda R$
const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
};

function DynamicSalary({ targetSalary, progress }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    const unsubscribe = progress.on("change", (latest) => {
      setVal(Math.round(latest * targetSalary));
    });
    return () => unsubscribe();
  }, [progress, targetSalary]);

  return <SalaryValue>{formatCurrency(val)}</SalaryValue>;
}

export default function SalaryTechnology() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const clampedProgress = useTransform(scrollYProgress, [0.15, 0.85], [0, 1]);

  const smoothProgress = useSpring(clampedProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  // Mapeia o progresso do desenho da linha
  const pathLength = useTransform(smoothProgress, [0, 1], [0, 1]);

  // Curva ajustada: Inicia em X: -150 Y: 250 (bem abaixo da área visível do viewport do SVG)
  // Mantém exatamente a mesma direção do Júnior e sobe até X: 295 Y: 10
  const concavePath = "M -150 250 Q 120 210, 295 10";

  // A máscara só começa a revelar o caminho a partir da interação do scroll
  const fillMaskWidth = useTransform(smoothProgress, [0, 1], ["0", "445"]);

  return (
    <ScrollContainer ref={containerRef}>
      <StickyWrapper>
        <DashboardContainer>
          {/* Título com clamp(2rem, 3.5vw, 2rem) mantido */}
          <HeaderBlock>
            <Badge>MERCADO DE TRABALHO</Badge>
            <Title>
              Média Salarial em <span>Desenvolvimento Web</span>
            </Title>
            <Subtitle>
              Role a página para visualizar a progressão salarial e o gráfico de valorização profissional do Júnior ao Sênior.
            </Subtitle>
          </HeaderBlock>

          <ContentGrid>
            {/* Coluna dos Profissionais e Valores */}
            <ProfessionalsList>
              <ProfessionalRow>
                <LevelTag>Júnior</LevelTag>
                <DynamicSalary targetSalary={3850} progress={smoothProgress} />
              </ProfessionalRow>

              <ProfessionalRow>
                <LevelTag>Pleno</LevelTag>
                <DynamicSalary targetSalary={7080} progress={smoothProgress} />
              </ProfessionalRow>

              <ProfessionalRow>
                <LevelTag>Sênior</LevelTag>
                <DynamicSalary targetSalary={9770} progress={smoothProgress} />
              </ProfessionalRow>
            </ProfessionalsList>

            {/* Gráfico Direto no Body */}
            <GraphWrapper>
              <SVGChart viewBox="0 0 300 200">
                <defs>
                  {/* Gradiente totalmente mapeado do ponto inicial oculto até o topo direito */}
                  <linearGradient
                    id="professionalBlueLine"
                    gradientUnits="userSpaceOnUse"
                    x1="-150"
                    y1="250"
                    x2="295"
                    y2="10"
                  >
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>

                  {/* Preenchimento Azul Escuro Profundo */}
                  <linearGradient
                    id="darkBlueArea"
                    gradientUnits="userSpaceOnUse"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="250"
                  >
                    <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#0f172a" stopOpacity="0.0" />
                  </linearGradient>

                  {/* Textura de Partículas de Luz no Fundo */}
                  <pattern id="particlesPattern" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="0.8" fill="#60a5fa" opacity="0.25" />
                  </pattern>

                  {/* Máscara com corte seguro em Y */}
                  <mask id="clipMask">
                    <motion.rect x="-150" y="0" width={fillMaskWidth} height="260" fill="#ffffff" />
                  </mask>
                </defs>

                {/* Camada de Partículas & Sombra sob a curva */}
                <g mask="url(#clipMask)">
                  <path
                    d={`${concavePath} L 295 250 L -150 250 Z`}
                    fill="url(#darkBlueArea)"
                  />
                  <path
                    d={`${concavePath} L 295 250 L -150 250 Z`}
                    fill="url(#particlesPattern)"
                  />
                </g>

                {/* Linha Curva Fina em Azul Profissional */}
                <motion.path
                  d={concavePath}
                  fill="none"
                  stroke="url(#professionalBlueLine)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  style={{
                    pathLength: pathLength,
                  }}
                />
              </SVGChart>
            </GraphWrapper>
          </ContentGrid>
        </DashboardContainer>
      </StickyWrapper>
    </ScrollContainer>
  );
}