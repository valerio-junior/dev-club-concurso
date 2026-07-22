import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

// --- Styled Components do FAQ ---

const FaqSectionContainer = styled.section`
  position: relative;
  z-index: 3; /* Camada mais alta para ficar POR CIMA da GarantiaDinamica */
  margin-top: -15vh; /* Faz encaixar por cima como papel */
  background-color: #030308;
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;

  /* Sombra no topo para dar o visual de elevação/camada sobreposta */
  box-shadow:
    0 -25px 50px rgba(0, 0, 0, 0.95),
    0 -1px 2px rgba(59, 130, 246, 0.2);

  padding: 7rem 6%;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  max-width: 900px;
  width: 100%;
`;

const HeaderBlock = styled.div`
  text-align: center;
  margin-bottom: 4rem;
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
`;

const Title = styled.h2`
  font-size: clamp(2rem, 3.5vw, 2rem);
  font-weight: 900;
  color: #ffffff;
  margin-top: 1.2rem;

  span {
    background: linear-gradient(135deg, #60a5fa 0%, #1d4ed8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const AccordionItem = styled.div`
  background: rgba(13, 17, 26, 0.75);
  border: 1px solid
    ${(props) =>
      props.isOpen ? "rgba(59, 130, 246, 0.5)" : "rgba(255, 255, 255, 0.08)"};
  border-radius: 16px;
  overflow: hidden;
  transition:
    border-color 0.3s ease,
    background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background: rgba(17, 24, 39, 0.85);
  }
`;

const AccordionHeader = styled.div`
  width: 100%;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 700;
  text-align: left;
`;

const IconWrapper = styled(motion.div)`
  color: #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AccordionBody = styled(motion.div)`
  padding: 0 2rem 1.5rem 2rem;
  color: #9ca3af;
  font-size: 1rem;
  line-height: 1.7;
`;

// --- Dados das Perguntas Frequentes ---
const faqData = [
  {
    question: "Quem é o Rodolfo?",
    answer:
      "De ex eletricista para um dos melhores mentores e profissionais da área da tecnologia, ja passou dificuldades e teve medo e dúvidas se iria conseguir igual a grande maioria de vocês, então ele é o mentor perfeito para você!",
  },
  {
    question: "Porque devo comprar o curso de vocês?",
    answer:
      "Fique tranquilo, você não é cobaia, nossa metodologia ajudou, e vem ajudando milhares de pessoas como você, venha fazer parte disso.",
  },
  {
    question: "Teremos acesso a comunidade?",
    answer:
      "Sim! e temos muitos profissionais, as que começaram agora e também as que já sao Pleno, Sênior e podem te ajudar, você não esta sozinho!",
  },
  {
    question: "O curso é para iniciantes ou precisa ter uma base?",
    answer:
      "Os dois. Se você está começando, os cursos te dão a base. Se já tem repertório, eles te ajudam a chegar mais rápido no seu objetivo",
  },
  {
    question: "Eu já trabalho na área, o curso vai agregar para mim?",
    answer:
      "Sim, e muito! temos formações do basico ao avançado, para programadores e pessoas que iram migrar para essa área, temos módulos de IA, análise de dados e muitos outros! ",
  },
  {
    question: "O curso disponibiliza certificado?",
    answer:
      "Sim, e com grande peso no mercado de trabalho, por mostrar que esta estudando e acquiring conhecimentos técnicos, e por fazer parte dessa grande familia DevClub.",
  },
  {
    question: "Qual são as formas de pagamento?",
    answer:
      "Conseguimos fazer a vista, no pix e até 12x no cartão de crédito, e claro! no boleto, então não tem desculpa para fazer parte disso.",
  },
  {
    question: "Como recebo o acesso ao conteúdo?",
    answer:
      "Logo após a confirmação do pagamento, você receberá um e-mail com todas as instruções e seus dados de acesso imediato à plataforma.",
  },
  {
    question: "Como funciona a garantia de 7 dias?",
    answer:
      "Você pode testar todo o conteúdo por 7 dias. Se por qualquer motivo achar que não é para você, basta solicitar o reembolso e devolvemos 100% do valor investido.",
  },
  {
    question: "Por quanto tempo terei acesso?",
    answer:
      "Você terá acesso por 12 meses completos a todo o conteúdo da Formação DevClub, incluindo as atualizações e novos módulos que forem sendo liberados durante esse período. Mas caso queira renovar você pode! Além de temos oportunidades para se tornar um vitalicio, e nessa parte nosso suporte pode te ajudar.",
  },
];

export default function QuestionsSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <FaqSectionContainer>
      <ContentWrapper>
        <HeaderBlock>
          <Badge>FAQ</Badge>
          <Title>
            Perguntas <span>Frequentes</span>
          </Title>
        </HeaderBlock>

        <AccordionContainer>
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <AccordionItem
                key={index}
                isOpen={isOpen}
                onClick={() => toggleAccordion(index)}
              >
                <AccordionHeader>
                  {faq.question}
                  <IconWrapper
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </IconWrapper>
                </AccordionHeader>

                <AnimatePresence>
                  {isOpen && (
                    <AccordionBody
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {faq.answer}
                    </AccordionBody>
                  )}
                </AnimatePresence>
              </AccordionItem>
            );
          })}
        </AccordionContainer>
      </ContentWrapper>
    </FaqSectionContainer>
  );
}
