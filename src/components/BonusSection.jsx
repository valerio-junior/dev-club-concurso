import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { motion, useMotionValue, animate } from "framer-motion";

const baseBonusData = [
  {
    id: 1,
    title: "Investidor em 1 Hora",
    category: "Educação Financeira",
    tag: "BÔNUS #01",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=600",
    description:
      "Aprenda a gerir seus primeiros salários em tecnologia, montar sua reserva e investir com inteligência.",
  },
  {
    id: 2,
    title: "Mentoria & Carreira",
    category: "Soft Skills",
    tag: "BÔNUS #02",
    image:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=600",
    description:
      "Como se posicionar no mercado, estruturar seu LinkedIn e se destacar em entrevistas de tecnologia.",
  },
  {
    id: 3,
    title: "A Fórmula para o Sucesso",
    category: "Mindset & Performance",
    tag: "BÔNUS #03",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600",
    description:
      "Estratégias de foco, constância e organização de estudos para acelerar sua transição de carreira.",
  },
  {
    id: 4,
    title: "Evento Netflix",
    category: "Projeto Prático",
    tag: "BÔNUS #04",
    image:
      "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&q=80&w=600",
    description:
      "Construção do zero de uma interface completa inspirada na Netflix com animações avançadas.",
  },
  {
    id: 5,
    title: "Evento Starbucks",
    category: "Landing Page High-Level",
    tag: "BÔNUS #05",
    image:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=600",
    description:
      "Desenvolvimento de uma Landing Page moderna e responsiva focada em conversão e UI Design.",
  },
  {
    id: 6,
    title: "Evento Instagram",
    category: "Full Stack / API",
    tag: "BÔNUS #06",
    image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=600",
    description:
      "Criação de um feed dinâmico integrado a APIs, consumindo dados em tempo real e manipulando estados.",
  },
];

// Multiplicamos os dados por 7 para garantir buffer infinito seguro para ambos os lados
const bonusData = [
  ...baseBonusData,
  ...baseBonusData,
  ...baseBonusData,
  ...baseBonusData,
  ...baseBonusData,
  ...baseBonusData,
  ...baseBonusData,
];

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

// --- Styled Components ---

const Container = styled.section`
  width: 100%;
  padding: 6rem 0;
  background-color: #030308;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const HeaderBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
  margin-bottom: 3rem;
  padding: 0 1.5rem;
  z-index: 2;
`;

const Badge = styled.span`
  background: rgba(0, 242, 254, 0.08);
  border: 1px solid rgba(0, 242, 254, 0.3);
  padding: 0.4rem 1.2rem;
  border-radius: 50px;
  color: #00f2fe;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const TitleContainer = styled.h2`
  font-size: clamp(2rem, 4vw, 2rem);
  font-weight: 900;
  color: #ffffff;
  min-height: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  span.typed-text {
    background: linear-gradient(135deg, #a855f7 0%, #00f2fe 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Cursor = styled.span`
  display: inline-block;
  width: 4px;
  height: 2.4rem;
  background-color: #00f2fe;
  margin-left: 6px;
  border-radius: 2px;
  box-shadow: 0 0 10px #00f2fe;
  animation: ${blink} 0.8s infinite;
`;

const Subtitle = styled.p`
  color: #94a3b8;
  font-size: 1rem;
  max-width: 600px;
`;

const HintText = styled.span`
  color: #64748b;
  font-size: 0.75rem;
  margin-top: 1rem;
`;

const CarouselViewport = styled.div`
  width: 100%;
  overflow: hidden;
  padding: 1.5rem 0 3rem 0;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

/* 
  ALINHAMENTO MANTIDO:
  3 cards no centro + exatamente meio card cortando à esquerda e à direita.
*/
const CarouselTrack = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  width: max-content;
  padding-left: calc(50vw - (3 * 270px + 2 * 1.5rem) / 2 - 135px);
`;

const Card = styled(motion.div)`
  background: rgba(13, 17, 26, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  width: 270px;
  flex-shrink: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  backdrop-filter: blur(16px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  user-select: none;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    border-color: rgba(0, 242, 254, 0.5);
    box-shadow: 0 15px 35px rgba(0, 242, 254, 0.15);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 180px;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
    transition: transform 0.5s ease;
  }

  ${Card}:hover & img {
    transform: scale(1.08);
  }
`;

const TagOverlay = styled.span`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(3, 3, 8, 0.85);
  border: 1px solid rgba(168, 85, 247, 0.5);
  color: #a855f7;
  font-size: 0.7rem;
  font-weight: 800;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  backdrop-filter: blur(8px);
`;

const CardContent = styled.div`
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1;
`;

const Category = styled.span`
  color: #00f2fe;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const CardTitle = styled.h3`
  color: #ffffff;
  font-size: 1.15rem;
  font-weight: 800;
  margin: 0;
`;

const CardDescription = styled.p`
  color: #94a3b8;
  font-size: 0.85rem;
  line-height: 1.5;
  margin: 0;
  margin-bottom: 0.8rem;
`;

const BrandFooter = styled.div`
  margin-top: auto;
  padding-top: 0.8rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BrandText = styled.span`
  color: #e2e8f0;
  font-size: 0.8rem;
  font-weight: 800;

  strong {
    color: #a855f7;
  }
`;

// --- Componente Principal ---
export default function BonusDevClub() {
  const words = [
    "Módulos Bônus Exclusivos",
    "Aulas Especiais de Mercado",
    "Projetos Reais e Práticos",
  ];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Largura exata de 1 ciclo completo de 6 cards (270px + 24px de gap)
  const setWidth = 6 * (270 + 24);

  // Posição inicial no meio exato do buffer (bloco 3 de 7), garantindo cards para ambos os lados
  const initialX = -setWidth * 3;
  const x = useMotionValue(initialX);

  // Efeito Typing Loop
  useEffect(() => {
    const fullWord = words[currentWordIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const handleTyping = () => {
      if (!isDeleting) {
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        if (currentText === fullWord) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex]);

  // RESET IMPERCEPTÍVEL: Mantém o x sempre próximo do bloco central sem solavancos
  const handleDragEnd = () => {
    const currentX = x.get();

    // Se puxou muito para a esquerda
    if (currentX < -setWidth * 4) {
      animate(x, currentX + setWidth, { duration: 0 });
    }
    // Se puxou muito para a direita
    else if (currentX > -setWidth * 2) {
      animate(x, currentX - setWidth, { duration: 0 });
    }
  };

  return (
    <Container>
      <HeaderBlock>
        <Badge>CONTEÚDO EXTRA</Badge>

        <TitleContainer>
          <span className="typed-text">{currentText}</span>
          <Cursor />
        </TitleContainer>

        <Subtitle>
          Além de toda a formação completa, você recebe esses bônus estratégicos
          sem pagar nada a mais.
        </Subtitle>

        <HintText>👈 Arraste para navegar pelos bônus 👉</HintText>
      </HeaderBlock>

      <CarouselViewport>
        <CarouselTrack
          drag="x"
          style={{ x }}
          onDragEnd={handleDragEnd}
          dragElastic={0.05}
          dragConstraints={{ left: -setWidth * 5, right: -setWidth * 1 }}
        >
          {bonusData.map((bonus, index) => (
            <Card key={`${bonus.id}-${index}`}>
              <ImageWrapper>
                <img src={bonus.image} alt={bonus.title} draggable="false" />
                <TagOverlay>{bonus.tag}</TagOverlay>
              </ImageWrapper>

              <CardContent>
                <Category>{bonus.category}</Category>
                <CardTitle>{bonus.title}</CardTitle>
                <CardDescription>{bonus.description}</CardDescription>

                <BrandFooter>
                  <BrandText>
                    Front-end <strong>CLUB</strong>
                  </BrandText>
                </BrandFooter>
              </CardContent>
            </Card>
          ))}
        </CarouselTrack>
      </CarouselViewport>
    </Container>
  );
}
