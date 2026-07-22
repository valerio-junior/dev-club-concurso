import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// --- Styled Components ---

const ScrollContainer = styled.section`
  min-height: 100vh;
  background-color: #030308;
  position: relative;
  
  /* 💡 FIM DA FAIXA BRANCA:
     1. Sem margem externa para não expor o fundo padrão da página.
     2. z-index garante sobreposição limpa sem cortar a imagem de cima.
     3. Padding interno gera o espaçamento sem quebrar o layout.
  */
  margin-top: 0;
  z-index: 2; 
  padding-top: 6rem;
  padding-bottom: 6rem;
  box-sizing: border-box;
`;

const ContentLayout = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.5rem;
  box-sizing: border-box;
`;

/* Header com presença e entrada limpa */
const HeaderBlock = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.8rem;
  z-index: 2;
  max-width: 750px;

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
  font-size: clamp(2.2rem, 4vw, 3rem);
  font-weight: 900;
  color: #ffffff;
  line-height: 1.1;

  span {
    font-size: 2.1rem;
    background: linear-gradient(135deg, #a855f7 0%, #00f2fe 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 0 20px rgba(0, 242, 254, 0.25));
  }
`;

const Subtitle = styled.p`
  color: #94a3b8;
  font-size: 1.05rem;
  line-height: 1.6;
  text-align: center;
  max-width: 620px;
  font-weight: 400;
`;

const ProjectsGrid = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  z-index: 2;

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const CardContainer = styled(motion.div)`
  background: rgba(13, 17, 26, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  padding: 1.25rem;
  backdrop-filter: blur(16px);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    border-color: rgba(168, 85, 247, 0.5);
    box-shadow: 0 15px 35px -10px rgba(127, 0, 255, 0.3);
  }
`;

const CardImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 1.2rem;
  position: relative;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  ${CardContainer}:hover & img {
    transform: scale(1.06);
  }
`;

const ProjectTitle = styled.h3`
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const ProjectDesc = styled.p`
  color: #8b949e;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1.2rem;
  text-align: center;
  flex-grow: 1;
`;

const TechTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.4rem;
`;

const Tag = styled.span`
  font-size: 0.68rem;
  font-weight: 800;
  padding: 0.25rem 0.65rem;
  border-radius: 6px;
  text-transform: uppercase;

  background: ${(props) =>
    props.tech === "HTML"
      ? "rgba(239, 68, 68, 0.15)"
      : props.tech === "CSS"
      ? "rgba(59, 130, 246, 0.15)"
      : props.tech === "JS"
      ? "rgba(245, 158, 11, 0.15)"
      : "rgba(6, 182, 212, 0.15)"};

  color: ${(props) =>
    props.tech === "HTML"
      ? "#f87171"
      : props.tech === "CSS"
      ? "#60a5fa"
      : props.tech === "JS"
      ? "#fbbf24"
      : "#38bdf8"};

  border: 1px solid
    ${(props) =>
      props.tech === "HTML"
        ? "rgba(239, 68, 68, 0.3)"
        : props.tech === "CSS"
        ? "rgba(59, 130, 246, 0.3)"
        : props.tech === "JS"
        ? "rgba(245, 158, 11, 0.3)"
        : "rgba(6, 182, 212, 0.3)"};
`;

// --- Dados dos Projetos ---
const projectsData = [
  {
    title: "HouseFinder",
    desc: "Plataforma para encontrar imóveis com filtros avançados e interface moderna.",
    tags: ["HTML", "CSS", "JS"],
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
  },
  {
    title: "RossAdef / Taskly",
    desc: "Dashboard de gestão financeira pessoal com gráficos e controle de saldo.",
    tags: ["HTML", "CSS", "JS", "REACT"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
  },
  {
    title: "EcoMarket",
    desc: "E-commerce sustentável com foco em produtos ecológicos e experiência intuitiva.",
    tags: ["HTML", "CSS", "JS", "REACT"],
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800",
  },
  {
    title: "Tasky",
    desc: "Gerenciador de tarefas para organizar atividades e aumentar a produtividade.",
    tags: ["HTML", "CSS", "JS", "REACT"],
    img: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800",
  },
  {
    title: "Weather App",
    desc: "Aplicativo de clima que mostra informações em tempo real de qualquer cidade.",
    tags: ["HTML", "CSS", "JS", "REACT"],
    img: "https://images.unsplash.com/photo-1504386106331-3e4e71712b38?w=800",
  },
  {
    title: "Receitas App",
    desc: "Aplicativo de receitas com busca, filtros e favoritos para culinária.",
    tags: ["HTML", "CSS", "JS", "REACT"],
    img: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800",
  },
];

// --- Componente Principal ---
export default function ProjectsSection() {
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

  const headerOpacity = useTransform(smoothProgress, [0, 0.5], [0, 1]);
  const headerY = useTransform(smoothProgress, [0, 0.5], ["-30px", "0px"]);

  const gridScale = useTransform(smoothProgress, [0.2, 0.8], [0.95, 1]);
  const gridOpacity = useTransform(smoothProgress, [0.2, 0.8], [0.3, 1]);
  const gridY = useTransform(smoothProgress, [0.2, 0.8], ["40px", "0px"]);

  return (
    <ScrollContainer id="projects" ref={containerRef}>
      <ContentLayout>
        {/* Cabeçalho */}
        <HeaderBlock style={{ opacity: headerOpacity, y: headerY }}>
          <Badge>PORTFÓLIO DE ALTO IMPACTO</Badge>
          <Title>
            <span>Projetos</span>
          </Title>
          <Subtitle>
            Alguns de nossos projetos práticos, reais e de qualidade
            para te prepararem para o mercado da tecnologia.
          </Subtitle>
        </HeaderBlock>

        {/* Grid de Projetos */}
        <ProjectsGrid
          style={{
            scale: gridScale,
            opacity: gridOpacity,
            y: gridY,
          }}
        >
          {projectsData.map((project, index) => (
            <CardContainer
              key={index}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <CardImageWrapper>
                <img src={project.img} alt={project.title} />
              </CardImageWrapper>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDesc>{project.desc}</ProjectDesc>
              <TechTags>
                {project.tags.map((tag, i) => (
                  <Tag key={i} tech={tag}>
                    {tag}
                  </Tag>
                ))}
              </TechTags>
            </CardContainer>
          ))}
        </ProjectsGrid>
      </ContentLayout>
    </ScrollContainer>
  );
}