import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import certificateHtml from "../assets/certificado-css.png"
import certificateCss from "../assets/certificado-html.png"
import certificateJs from "../assets/certificado-js.jpg"
import certificateGitHub from "../assets/certificado-github.png"
import certificateNode from "../assets/certificado-node.png"

const certificatesData = [
  {
    id: 1,
    title: "Certificado 1",
    image: certificateHtml,
  },
  {
    id: 2,
    title: "Certificado 2",
    image: certificateCss,
  },
  {
    id: 3,
    title: "Certificado 3",
    image: certificateGitHub,
  },
  {
    id: 4,
    title: "Certificado 4",
    image: certificateJs,
  },
   {
    id: 5,
    title: "Certificado 5",
    image: certificateNode,
  },
];

// Triplicamos a lista para criar a ilusão de loop infinito e sem cortes
const infiniteCertificates = [
  ...certificatesData,
  ...certificatesData,
  ...certificatesData,
];

const Container = styled.section`
  width: 100%;
  padding: 1rem 0;
  background-color: #030308;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const HeaderBlock = styled.div`
  text-align: center;
  margin-bottom: 3.5rem;
  padding: 0 1.5rem;
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

const Title = styled.h2`
  font-size: clamp(2rem, 4vw, 2rem);
  font-weight: 900;
  color: #ffffff;
  margin-top: 1rem;

  span {
    background: linear-gradient(135deg, #a855f7 0%, #00f2fe 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Viewport = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  position: relative;

  /* Gradiente nas pontas para dar um efeito suave de esmaecimento */
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
`;

const Track = styled(motion.div)`
  display: flex;
  gap: 2rem;
  width: max-content;
  padding: 1.5rem 0;
`;

const CertificateCard = styled(motion.div)`
  width: 380px;
  height: 260px;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
  }
`;

export default function CertificatesDevClub() {
  return (
    <Container>
      <HeaderBlock id="certificates">
        <Badge>CONQUISTAS & CERTIFICAÇÕES</Badge>
        <Title>
          Certificados de <span>Especialização</span>
        </Title>
      </HeaderBlock>

      <Viewport>
        <Track
          animate={{
            x: ["0%", "-33.333%"], // Passa suavemente da direita para a esquerda
          }}
          transition={{
            ease: "linear",
            duration: 25, // Duração longa para movimento bem suave e sem pressa
            repeat: Infinity,
          }}
        >
          {infiniteCertificates.map((cert, index) => (
            <CertificateCard
              key={`${cert.id}-${index}`}
              whileHover={{ y: -12 }} // Eleva apenas o card com hover
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <img src={cert.image} alt={cert.title} />
            </CertificateCard>
          ))}
        </Track>
      </Viewport>
    </Container>
  );
}
