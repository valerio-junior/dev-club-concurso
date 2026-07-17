import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  Code, Globe, Layout, Paintbrush, FileJson, GitBranch, 
  Layers, ShieldAlert, Server, Cpu, Terminal, BarChart3 
} from 'lucide-react';

const SectionContainer = styled.section`
  width: 100%;
  background-color: #030308;
  padding: 8rem 4rem;
  display: flex;
  flex-direction: column;
  position: relative;
  font-family: 'Roboto', sans-serif;
  color: #ffffff;
  overflow: hidden;

  @media (max-width: 1024px) {
    padding: 6rem 2rem;
  }
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 4rem;
  margin-bottom: 5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 3rem;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const HeaderLeft = styled(motion.h2)`
  flex: 1.2;
  font-size: 2.2rem;
  font-weight: 900;
  line-height: 1.3;
  letter-spacing: 1px;
  background: linear-gradient(135deg, #ffffff 0%, #8b9bb4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  span {
    background: linear-gradient(135deg, #00f2fe 0%, #7f00ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 1200px) {
    font-size: 1.8rem;
  }
`;

const HeaderRight = styled(motion.p)`
  flex: 0.8;
  font-size: 1.1rem;
  color: #8b9bb4;
  line-height: 1.6;
  letter-spacing: 0.5px;
  font-weight: 500;
  align-self: flex-end;

  @media (max-width: 900px) {
    align-self: flex-start;
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  width: 100%;

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

// Componentes internos de apoio ao Card
const GlowBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 140px; // Delimita o esfumaçado exatamente até passar do ícone
  background: radial-gradient(circle at 50% 0%, ${props => props.glowColor} 0%, transparent 70%);
  opacity: 0.15; // Opacidade sutil padrão
  transition: opacity 0.4s ease;
  pointer-events: none;
  z-index: 0;
`;

const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8b9bb4; // Inicialmente cinza metálico discreto
  z-index: 1;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);

  svg {
    width: 24px;
    height: 24px;
  }
`;

const CardTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: 1px;
  color: #ffffff; // Cor neutra inicial
  margin: 0;
  z-index: 1;
  transition: color 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
`;

const CardDescription = styled.p`
  font-size: 0.85rem;
  color: #8b9bb4;
  line-height: 1.6;
  margin: 0;
  font-weight: 500;
  z-index: 1;
`;

// Nova borda dinâmica usando a cor específica da skill
const DynamicBorderGlow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  border: 1.5px solid transparent;
  background: linear-gradient(135deg, ${props => props.glowColor} 0%, rgba(255,255,255,0.05) 100%) border-box;
  mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0.15; // Deixa um contorno sutil já no início
  transition: all 0.4s ease;
  pointer-events: none;
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  cursor: pointer;
  height: 100%;

  // HOVER STATE: Modifica elementos internos de forma sincronizada
  &:hover {
    ${GlowBackground} {
      opacity: 0.35; // Intensifica o esfumaçado específico no topo
    }

    ${DynamicBorderGlow} {
      opacity: 1; // Ativa a borda brilhante
    }

    ${IconWrapper} {
      color: ${props => props.themeColor}; // Muda cor do ícone
      background: ${props => props.themeColor}15; // Fundo do ícone com 15% de opacidade
      border-color: ${props => props.themeColor}40; // Borda do ícone
      box-shadow: 0 0 15px ${props => props.themeColor}30;
      transform: translateY(-2px);
    }

    ${CardTitle} {
      color: ${props => props.themeColor}; // Título herda cor idêntica ao esfumaçado
      text-shadow: 0 0 10px ${props => props.themeColor}20;
    }
  }
`;

export default function Courses() {
  
  const coursesData = [
    {
      title: "Formação Front-end",
      description: "Trilhe a linha completa para se tornar um desenvolvedor web especialista em criar experiências incríveis na tela.",
      icon: <Layout />,
      color: "#00f2fe" 
    },
    {
      title: "Desenvolvedor Fullstack",
      description: "Domine o ecossistema completo de desenvolvimento, integrando perfeitamente a lógica do servidor com as interfaces web.",
      icon: <Globe />,
      color: "#7f00ff" 
    },
    {
      title: "HTML",
      description: "Aprenda HTML com a melhor didática e projetos reais estruturados para consolidar o seu aprendizado definitivo.",
      icon: <Code />,
      color: "#e34f26" 
    },
    {
      title: "CSS",
      description: "Aprenda a estilizar suas páginas de forma totalmente profissional utilizando projetos práticos e layouts inovadores.",
      icon: <Paintbrush />,
      color: "#1572b6"
    },
    {
      title: "JavaScript",
      description: "Descubra o poder da linguagem que move a web moderna, dominando lógica de programação e manipulações dinâmicas de dados.",
      icon: <FileJson />,
      color: "#f7df1e"
    },
    {
      title: "Git e GitHub",
      description: "Gerencie o histórico do seu código e domine o trabalho colaborativo em equipe utilizando a principal ferramenta corporativa do planeta.",
      icon: <GitBranch />,
      color: "#f05032"
    },
    {
      title: "React",
      description: "Desenvolva aplicações de alto desempenho baseadas em componentes reutilizáveis utilizando a biblioteca criada pelo Facebook.",
      icon: <Layers />,
      color: "#61dafb"
    },
    {
      title: "TypeScript",
      description: "Escreva códigos JavaScript mais seguros, organizados e fáceis de manter no futuro adicionando tipagem estática e robustez aos projetos.",
      icon: <ShieldAlert />,
      color: "#3178c6"
    },
    {
      title: "Node.js",
      description: "Construa APIs escaláveis de alta performance no backend utilizando JavaScript, bancos de dados modernos e arquiteturas de ponta.",
      icon: <Server />,
      color: "#339933"
    },
    {
      title: "N8N",
      description: "Aprenda a criar automações robustas sem limites de código, conectando aplicações inteiras e automatizando processos de forma inteligente.",
      icon: <Cpu />,
      color: "#ff6c37"
    },
    {
      title: "Python",
      description: "Domine a linguagem mais versátil do mercado e aprenda a criar scripts, automatizar rotinas e desenvolver soluções inteligentes e rápidas.",
      icon: <Terminal />,
      color: "#3776ab"
    },
    {
      title: "Análise de Dados",
      description: "Converta fluxos massivos de informações em inteligência estratégica utilizando as principais ferramentas do mercado corporativo.",
      icon: <BarChart3 />,
      color: "#00d28a"
    }
  ];

  return (
    <SectionContainer id="formacoes-section">
      <HeaderContainer>
        <HeaderLeft
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          Formações e Trilhas para você <span>não se perder no caminho</span> e traçar uma linha direta.
        </HeaderLeft>
        <HeaderRight
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          E com os melhores professores e didáticas que fazem você vir do completo zero ao nível avançado pronto para o mercado de trabalho.
        </HeaderRight>
      </HeaderContainer>

      <CardsGrid>
        {coursesData.map((course, idx) => (
          <Card
            key={idx}
            themeColor={course.color}
            
    
            initial={{ 
              opacity: 0, 
              x: idx % 2 === 0 ? -80 : 80, 
              y: 20 
            }}
            
           
            whileInView={{ 
              opacity: 1, 
              x: 0, 
              y: 0 
            }}
            
           
            viewport={{ once: true, margin: "-80px" }}
            
            
            transition={{ 
              type: "spring",
              stiffness: 50,
              damping: 15,
              delay: (idx % 4) * 0.1 
            }}
            
            
            whileHover={{ 
              y: -8, 
              x: 8,  
              transition: { duration: 0.25, ease: "easeOut" } 
            }}
            style={{
              boxShadow: "0px 0px 0px rgba(0,0,0,0)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            
            <GlowBackground glowColor={course.color} />
            
            
            <DynamicBorderGlow glowColor={course.color} />

            <IconWrapper>
              {course.icon}
            </IconWrapper>
            
            <CardTitle>{course.title}</CardTitle>
            <CardDescription>{course.description}</CardDescription>
          </Card>
        ))}
      </CardsGrid>
    </SectionContainer>
  );
}