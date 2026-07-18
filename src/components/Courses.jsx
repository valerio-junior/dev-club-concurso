import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Code, Globe, Layout, Paintbrush, FileJson, GitBranch, 
  Layers, ShieldAlert, Server, Cpu, Terminal, BarChart3 
} from 'lucide-react';

const ScrollWrapper = styled.div`
  width: 100%;
  height: 320vh; 
  background-color: #030308;
  position: relative;
`;

const StickyContainer = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 100vh;
  padding: 3rem 4rem 2rem 4rem; 
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
  color: #ffffff;

  @media (max-width: 1024px) {
    padding: 2rem 2rem;
  }
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  margin-bottom: 1.5rem; 
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 1rem;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const HeaderLeft = styled(motion.h2)`
  flex: 1.2;
  font-size: 1.7rem; 
  font-weight: 900;
  line-height: 1.3;
  letter-spacing: 1px;
  background: linear-gradient(135deg, #ffffff 0%, #8b9bb4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const HeaderRight = styled(motion.p)`
  flex: 0.8;
  font-size: 0.9rem;
  color: #8b9bb4;
  line-height: 1.6;
  letter-spacing: 0.5px;
  font-weight: 500;
  align-self: flex-end;

  @media (max-width: 900px) {
    align-self: flex-start;
  }
`;

const CardsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem; 
  width: 100%;
  flex: 1; 
  position: relative;
  transform-origin: center top; 

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const GlowBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: radial-gradient(circle at 50% 0%, ${props => props.glowColor} 0%, transparent 70%);
  opacity: 0.15;
  transition: opacity 0.4s ease;
  pointer-events: none;
  z-index: 0;
`;

const IconWrapper = styled.div`
  width: 38px; 
  height: 38px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8b9bb4;
  z-index: 1;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);

  svg {
    width: 18px;
    height: 18px;
  }
`;

const CardTitle = styled.h4`
  font-size: 0.95rem; 
  font-weight: 800;
  letter-spacing: 1px;
  color: #ffffff;
  margin: 0;
  z-index: 1;
  transition: color 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
`;

const CardDescription = styled.p`
  font-size: 0.75rem; 
  color: #8b9bb4;
  line-height: 1.4;
  margin: 0;
  font-weight: 500;
  z-index: 1;
`;

const DynamicBorderGlow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 14px;
  border: 1.5px solid transparent;
  background: linear-gradient(135deg, ${props => props.glowColor} 0%, rgba(255,255,255,0.05) 100%) border-box;
  mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0.15;
  transition: all 0.4s ease;
  pointer-events: none;
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.03);
  border-radius: 14px;
  padding: 1rem 1.2rem; 
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  cursor: pointer;
  height: 100%;

  &:hover {
    ${GlowBackground} { opacity: 0.35; }
    ${DynamicBorderGlow} { opacity: 1; }
    ${IconWrapper} {
      color: ${props => props.themeColor};
      background: ${props => props.themeColor}15;
      border-color: ${props => props.themeColor}40;
      box-shadow: 0 0 15px ${props => props.themeColor}30;
      transform: translateY(-2px);
    }
    ${CardTitle} {
      color: ${props => props.themeColor};
      text-shadow: 0 0 10px ${props => props.themeColor}20;
    }
  }
`;

const AnimatedCardWrapper = ({ children, index, total, scrollProgress }) => {
  const startInterval = (index / total) * 0.72; 
  const endInterval = startInterval + 0.12;

  // as transformações agora escutam o "smoothProgress",
  // o que remove o aspecto robotizado e deixa as curvas de entrada fluidas.
  const x = useTransform(scrollProgress, [0, startInterval, endInterval], ["100vw", "100vw", "0%"]);
  const y = useTransform(scrollProgress, [0, startInterval, endInterval], ["80vh", "80vh", "0vh"]);
  const scale = useTransform(scrollProgress, [0, startInterval, endInterval], [0.4, 0.4, 1]);
  const opacity = useTransform(scrollProgress, [0, startInterval, endInterval], [0, 0, 1]);
  const rotate = useTransform(scrollProgress, [0, startInterval, endInterval], [25, 25, 0]);

  return (
    <motion.div style={{ x, y, scale, opacity, rotate, height: '100%' }}>
      {children}
    </motion.div>
  );
};

export default function Courses() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });


  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    restDelta: 0.001
  });

  const headerOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0.9]);
  const gridY = useTransform(smoothProgress, [0, 0.35, 0.95], ["0vh", "0vh", "-26vh"]);
  const gridScale = useTransform(smoothProgress, [0, 0.4, 0.95], [1, 1, 0.9]);

  const coursesData = [
    { title: "Formação Front-end", description: "Trilhe a linha completa para se tornar um desenvolvedor especialista em criar experiências incríveis.", icon: <Layout />, color: "#00f2fe" },
    { title: "Desenvolvedor Fullstack", description: "Domine o ecossistema completo, integrando perfeitamente a lógica do servidor com as interfaces web.", icon: <Globe />, color: "#7f00ff" },
    { title: "HTML", description: "Aprenda HTML com a melhor didática e projetos reais estruturados para consolidar o seu aprendizado.", icon: <Code />, color: "#e34f26" },
    { title: "CSS", description: "Aprenda a estilizar suas páginas de forma totalmente profissional utilizando layouts inovadores.", icon: <Paintbrush />, color: "#1572b6" },
    { title: "JavaScript", description: "Descubra o poder da linguagem que move a web moderna, dominando lógica e manipulações de dados.", icon: <FileJson />, color: "#f7df1e" },
    { title: "Git e GitHub", description: "Gerencie o histórico do seu código e domine o trabalho colaborativo utilizando a ferramenta padrão do mercado.", icon: <GitBranch />, color: "#f05032" },
    { title: "React", description: "Desenvolva aplicações de alto desempenho baseadas em componentes reutilizáveis usando a biblioteca líder.", icon: <Layers />, color: "#61dafb" },
    { title: "TypeScript", description: "Escreva códigos JavaScript mais seguros, organizados e fáceis de manter adicionando tipagem estática.", icon: <ShieldAlert />, color: "#3178c6" },
    { title: "Node.js", description: "Construa APIs escaláveis de alta performance no backend utilizando JavaScript e bancos de dados modernos.", icon: <Server />, color: "#339933" },
    { title: "N8N", description: "Aprenda a criar automações robustas sem limites de código, conectando aplicações inteiras estrategicamente.", icon: <Cpu />, color: "#ff6c37" },
    { title: "Python", description: "Domine a linguagem mais versátil do mercado e aprenda a criar scripts e automatizar rotinas inteligentes.", icon: <Terminal />, color: "#3776ab" },
    { title: "Análise de Dados", description: "Converta fluxos massivos de informações em inteligência estratégica utilizando as principais ferramentas.", icon: <BarChart3 />, color: "#00d28a" }
  ];

  return (
    <ScrollWrapper ref={containerRef} id="formacoes-section">
      <StickyContainer>
        <motion.div style={{ opacity: headerOpacity }}>
          <HeaderContainer>
            <HeaderLeft>
              Formações e Trilhas para você não se perder no caminho e traçar uma linha direta.
            </HeaderLeft>
            <HeaderRight>
              Didáticas que fazem você vir do completo zero ao nível avançado pronto para o mercado de trabalho.
            </HeaderRight>
          </HeaderContainer>
        </motion.div>

        {/* Passando o smoothProgress para os cards também */}
        <CardsGrid style={{ y: gridY, scale: gridScale }}>
          {coursesData.map((course, idx) => (
            <AnimatedCardWrapper
              key={idx}
              index={idx}
              total={coursesData.length}
              scrollProgress={smoothProgress}
            >
              <Card
                themeColor={course.color}
                whileHover={{ 
                  y: -6, 
                  x: 6,  
                  transition: { duration: 0.2, ease: "easeOut" } 
                }}
                whileTap={{ scale: 0.98 }}
              >
                <GlowBackground glowColor={course.color} />
                <DynamicBorderGlow glowColor={course.color} />
                <IconWrapper>{course.icon}</IconWrapper>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </Card>
            </AnimatedCardWrapper>
          ))}
        </CardsGrid>
      </StickyContainer>
    </ScrollWrapper>
  );
}