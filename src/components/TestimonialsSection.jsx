import React, { useState, useRef } from "react";
import styled from "styled-components";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";

// --- Dados dos Depoimentos ---
const testimonialsData = [
  {
    id: 1,
    name: "Gabriel Santos",
    role: "Desenvolvedor Front-end Jr",
    company: "TechSolutions",
    quote:
      '"A didática e os projetos práticos foram o divisor de águas na minha carreira. Antes do curso eu não sabia como montar um portfólio profissional, e em menos de 3 meses após terminar, consegui minha primeira vaga dev!"',
    youtubeId: "LXb3EKWsInQ",
    startTime: 30,
  },
  {
    id: 2,
    name: "Mariana Lima",
    role: "Engenheira de Software",
    company: "Fintech Growth",
    quote:
      '"Eu vinha de outra área e tinha muito receio de não acompanhar. A comunidade e a estrutura dos projetos me deram a confiança necessária para encarar os processos seletivos e passar de primeira."',
    youtubeId: "LDB4uaJ87e0",
    startTime: 15,
  },
  {
    id: 3,
    name: "Lucas Andrade",
    role: "Desenvolvedor React",
    company: "Studio Web",
    quote:
      '"O grande diferencial foi aprender como o mercado realmente trabalha. Não foi só sintaxe de código, mas sim arquitetura, boas práticas e como resolver problemas reais do dia a dia."',
    youtubeId: "QFaFIcGhPoM",
    startTime: 45,
  },
  {
    id: 4,
    name: "Beatriz Ribeiro",
    role: "Front-end Developer",
    company: "Inovação Digital",
    quote:
      '"Consegui aplicar no meu trabalho atual tudo o que aprendi e logo fui promovida. A qualidade das aulas e o foco em UI/UX moderno me destacaram de todos os outros candidatos."',
    youtubeId: "Ke90Tje7VS0",
    startTime: 10,
  },
  {
    id: 5,
    name: "Felipe Melo",
    role: "Desenvolvedor Full Stack Jr",
    company: "CloudLab",
    quote:
      '"O suporte durante o curso e o network que criei foram sensacionais. A sensação de ver meus projetos rodando em produção e recebendo elogios nas entrevistas não tem preço."',
    youtubeId: "kqtD5dpn9C8",
    startTime: 20,
  },
  {
    id: 6,
    name: "Camila Vasconcelos",
    role: "UI Engineer",
    company: "NextGen Tech",
    quote:
      '"Foi o melhor investimento que fiz no meu ano. Se você busca sair do zero e chegar ao mercado preparado para os desafios reais, esse é o caminho certo sem enrolação."',
    youtubeId: "mU6anWqZJcc",
    startTime: 5,
  },
];

// --- Styled Components ---

const SectionContainer = styled.section`
  min-height: 100vh;
  background-color: #030308;
  position: relative;
  z-index: 2;
  padding: 6rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  overflow: hidden;
`;

const ContentLayout = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`;

const HeaderBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.8rem;
  max-width: 700px;
  padding: 0 1.5rem;

  &::before {
    content: "";
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, #7f00ff, #00f2fe);
    border-radius: 10px;
    margin-bottom: 0.4rem;
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
  box-shadow: 0 0 15px rgba(127, 0, 255, 0.15);
`;

const Title = styled.h2`
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 900;
  color: #ffffff;
  line-height: 1.15;

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
  line-height: 1.6;
  text-align: center;
  font-weight: 400;
`;

/* Palco do Carrossel 3D */
const CarouselStage = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 420px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 868px) {
    height: 520px;
  }
`;

/* Card individual com visualização de camadas */
const TestimonialCard = styled(motion.div)`
  background: rgba(13, 17, 26, 0.9);
  border: 1px solid
    ${(props) =>
      props.$isActive ? "rgba(168, 85, 247, 0.6)" : "rgba(255, 255, 255, 0.08)"};
  border-radius: 24px;
  padding: 2.2rem;
  backdrop-filter: blur(20px);
  width: min(850px, 88vw);
  position: absolute;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 2rem;
  align-items: center;
  box-shadow: ${(props) =>
    props.$isActive
      ? "0 20px 40px -10px rgba(127, 0, 255, 0.3)"
      : "0 10px 30px rgba(0, 0, 0, 0.5)"};
  cursor: ${(props) => (props.$isActive ? "default" : "pointer")};

  @media (max-width: 868px) {
    grid-template-columns: 1fr;
    padding: 1.6rem;
    gap: 1.5rem;
  }
`;

const QuoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  height: 100%;
`;

const QuoteText = styled.p`
  color: #e2e8f0;
  font-size: clamp(0.95rem, 1.6vw, 1.1rem);
  line-height: 1.6;
  font-style: italic;
  font-weight: 300;
  margin-bottom: 1.8rem;
  z-index: 1;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 3px solid #a855f7;
  padding-left: 1rem;
`;

const AuthorName = styled.h4`
  color: #ffffff;
  font-size: 1.15rem;
  font-weight: 700;
  margin: 0;
`;

const AuthorRole = styled.span`
  color: #94a3b8;
  font-size: 0.85rem;
  margin-top: 0.2rem;

  strong {
    color: #00f2fe;
    font-weight: 500;
  }
`;

/* Container de Vídeo */
const VideoContainer = styled.div`
  width: 100%;
  height: 280px;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  background: #0d1117;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);

  iframe,
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: none;
    pointer-events: none;
  }

  /* Camada invisível de bloqueio total */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
    background: transparent;
  }

  @media (max-width: 868px) {
    height: 210px;
  }
`;

/* Setas Flutuantes */
const NavButton = styled(motion.button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(13, 17, 26, 0.9);
  border: 1px solid rgba(168, 85, 247, 0.5);
  color: #ffffff;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 30;
  backdrop-filter: blur(12px);
  transition: all 0.3s ease;

  &:hover {
    background: #a855f7;
    border-color: #a855f7;
    box-shadow: 0 0 25px rgba(168, 85, 247, 0.7);
  }

  svg {
    width: 24px;
    height: 24px;
    fill: currentColor;
  }

  ${(props) => (props.$direction === "left" ? "left: 20px;" : "right: 20px;")}

  @media (max-width: 768px) {
    ${(props) => (props.$direction === "left" ? "left: 5px;" : "right: 5px;")}
    width: 44px;
    height: 44px;
  }
`;

const DotsContainer = styled.div`
  display: flex;
  gap: 0.6rem;
  justify-content: center;
  margin-top: 0.5rem;
`;

const Dot = styled.button`
  width: ${(props) => (props.$active ? "28px" : "10px")};
  height: 10px;
  border-radius: 20px;
  background: ${(props) =>
    props.$active
      ? "linear-gradient(90deg, #7f00ff, #00f2fe)"
      : "rgba(255, 255, 255, 0.2)"};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => (props.$active ? "" : "rgba(255, 255, 255, 0.4)")};
  }
`;

// --- Componente Principal ---
export default function TestimonialsStudents() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const sectionOpacity = useTransform(smoothProgress, [0, 0.6], [0, 1]);
  const sectionY = useTransform(smoothProgress, [0, 0.6], ["40px", "0px"]);

  const handleNext = () => {
    if (currentIndex < testimonialsData.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Posições dos cards em relação ao ativo
  const getCardPosition = (index) => {
    const diff = index - currentIndex;

    if (diff === 0) return "center";
    if (diff === -1) return "left";
    if (diff === 1) return "right";
    return "hidden";
  };

  const cardVariants = {
    center: {
      x: "0%",
      scale: 1,
      opacity: 1,
      zIndex: 10,
      filter: "blur(0px)",
      pointerEvents: "auto",
    },
    left: {
      x: "-50%",
      scale: 0.82,
      opacity: 0.35,
      zIndex: 5,
      filter: "blur(2px)",
      pointerEvents: "auto",
    },
    right: {
      x: "50%",
      scale: 0.82,
      opacity: 0.35,
      zIndex: 5,
      filter: "blur(2px)",
      pointerEvents: "auto",
    },
    hidden: {
      x: "0%",
      scale: 0.6,
      opacity: 0,
      zIndex: 1,
      filter: "blur(5px)",
      pointerEvents: "none",
    },
  };

  return (
    <SectionContainer ref={containerRef}>
      <ContentLayout style={{ opacity: sectionOpacity, y: sectionY }}>
        <HeaderBlock>
          <Badge>HISTÓRIAS DE SUCESSO</Badge>
          <Title>
            O que nossos <span>alunos dizem</span>
          </Title>
          <Subtitle>
            Veja como profissionais saíram do zero e conquistaram suas vagas no mercado através dos nossos treinamentos.
          </Subtitle>
        </HeaderBlock>

        {/* Palco Centralizado do Carrossel 3D */}
        <CarouselStage>
          {/* Botão Voltar */}
          {currentIndex > 0 && (
            <NavButton
              $direction="left"
              onClick={handlePrev}
              whileTap={{ scale: 0.9 }}
              aria-label="Depoimento anterior"
            >
              <svg viewBox="0 0 24 24">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </NavButton>
          )}

          {/* Botão Avançar */}
          {currentIndex < testimonialsData.length - 1 && (
            <NavButton
              $direction="right"
              onClick={handleNext}
              whileTap={{ scale: 0.9 }}
              aria-label="Próximo depoimento"
            >
              <svg viewBox="0 0 24 24">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </NavButton>
          )}

          {/* Cards em Órbita */}
          {testimonialsData.map((item, index) => {
            const position = getCardPosition(index);
            const isActive = position === "center";

            return (
              <TestimonialCard
                key={item.id}
                $isActive={isActive}
                initial="hidden"
                animate={position}
                variants={cardVariants}
                transition={{ type: "spring", stiffness: 220, damping: 26 }}
                onClick={() => {
                  if (position === "left") handlePrev();
                  if (position === "right") handleNext();
                }}
              >
                <QuoteContainer>
                  <div>
                    <QuoteText>{item.quote}</QuoteText>
                  </div>
                  <AuthorInfo>
                    <AuthorName>{item.name}</AuthorName>
                    <AuthorRole>
                      {item.role} na <strong>{item.company}</strong>
                    </AuthorRole>
                  </AuthorInfo>
                </QuoteContainer>

                <VideoContainer>
                  {/* O vídeo só carrega o iframe quando for o card do meio para rodar fluido */}
                  {isActive ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&mute=1&controls=0&disablekb=1&modestbranding=1&rel=0&loop=1&playlist=${item.youtubeId}&start=${item.startTime}`}
                      title={`Depoimento de ${item.name}`}
                      allow="autoplay"
                    />
                  ) : (
                    <img
                      src={`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`}
                      alt={`Depoimento de ${item.name}`}
                    />
                  )}
                </VideoContainer>
              </TestimonialCard>
            );
          })}
        </CarouselStage>

        {/* Indicadores de Ponto */}
        <DotsContainer>
          {testimonialsData.map((item, index) => (
            <Dot
              key={item.id}
              $active={index === currentIndex}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </DotsContainer>
      </ContentLayout>
    </SectionContainer>
  );
}