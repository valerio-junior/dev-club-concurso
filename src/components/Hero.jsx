import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Container = styled.section`
  min-height: 100vh;
  width: 100%;
  background-color: #030308;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  color: #ffffff;
`;

const CanvasContainer = styled.div`
  width: 100%;
  height: 65vh;
  position: relative;
  z-index: 2;
  cursor: pointer;
`;

const CanvasStyled = styled.canvas`
  width: 100%;
  height: 100%;
  display: block;
`;

const SocialProofContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  z-index: 2;
  margin-top: 1rem;
  background: rgba(255, 255, 255, 0.03);
  padding: 0.8rem 1.6rem;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
`;

const AvatarStack = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 2px solid #030308;
  object-fit: cover;
  margin-left: -12px;
  box-shadow: 0 0 10px rgba(0, 242, 254, 0.15);
  transition: transform 0.3s ease, z-index 0.3s ease;
  cursor: pointer;

  &:first-child {
    margin-left: 0;
  }

  &:hover {
    transform: translateY(-4px) scale(1.1);
    z-index: 10;
    box-shadow: 0 0 15px rgba(0, 242, 254, 0.4);
  }
`;

const ProofText = styled.span`
  font-size: 0.9rem;
  color: #c9d1d9;
  letter-spacing: 1px;
  font-weight: 700;
  
  span {
    background: linear-gradient(to right, #00f2fe, #4facfe);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 900;
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: #00F2FE;
  cursor: pointer;
  z-index: 2;
  font-size: 0.8rem;
  letter-spacing: 2px;
`;

export default function Hero() {
  const canvasRef = useRef(null);
  const [isClicked, setIsClicked] = useState(false);
  const isClickedRef = useRef(isClicked);

  useEffect(() => {
    isClickedRef.current = isClicked;
  }, [isClicked]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();

    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = 800;
    tempCanvas.height = 200;
    
    tempCtx.fillStyle = '#ffffff';
    tempCtx.font = '900 110px Orbitron';
    tempCtx.textAlign = 'center';
    tempCtx.textBaseline = 'middle';
    tempCtx.fillText('DEVCLUB', 400, 100);

    const imgData = tempCtx.getImageData(0, 0, 800, 200);
    const points = [];
    const step = 4; 

    for (let y = 0; y < 200; y += step) {
      for (let x = 0; x < 800; x += step) {
        const index = (y * 800 + x) * 4;
        const alpha = imgData.data[index + 3];
        if (alpha > 128) {
          points.push({
            targetX: x - 400,
            targetY: y - 100,
          });
        }
      }
    }

    let cycleTimer = 0;
    let globalAngleY = 0; 
    let globalAngleX = 0; 
    let isFirstLoad = true; 
    
    // Tempos ajustados incluindo a nova fase de explosão (decay) no final do ciclo
    const ATTRACT_TIME = 240;     // Puxa as partículas devagar (suspense)
    const HOLD_TIME = 200;        // Tempo estável para leitura da palavra
    const TENSION_TIME = 260;     // Deformação progressiva no formato quadrado e rotação multieixo
    const DECAY_TIME = 120;       // EXPLOSÃO total estilo Big Bang antes de reiniciar o loop
    const CYCLE_DURATION = ATTRACT_TIME + HOLD_TIME + TENSION_TIME + DECAY_TIME; 

    class RotatingParticle3D {
      constructor(targetX, targetY, canvasWidth, canvasHeight) {
        this.x = (Math.random() - 0.5) * canvasWidth;
        this.y = (Math.random() - 0.5) * canvasHeight;
        this.z = (Math.random() - 0.5) * 600;

        this.targetX = targetX;
        this.targetY = targetY;
        this.targetZ = 0; 

        this.baseSize = Math.random() * 2 + 1;
        
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = (Math.random() - 0.5) * 4;
        this.vz = (Math.random() - 0.5) * 4;

        this.ease = Math.random() * 0.012 + 0.006; 
        this.friction = 0.88; 
      }

      update(state, clickBurst, angleX, angleY, tensionProgress) {
        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);
        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);

        let finalTargetX = this.targetX;
        let finalTargetY = this.targetY;
        let finalTargetZ = this.targetZ;

        // 1. Estado Tension: Transição e deformação progressiva para o quadrado tridimensional
        if (state === 'tension') {
          const squareSize = 140; 
          const squareX = Math.sign(this.targetX) * (Math.abs(this.targetX) % squareSize) - (squareSize / 2);
          const squareY = Math.sign(this.targetY) * (Math.abs(this.targetY) % squareSize) - (squareSize / 2);
          const squareZ = (Math.sin(this.targetX * 0.05) * 60);

          // Interpola linearmente entre a palavra e o quadrado usando o progresso do tempo
          finalTargetX = this.targetX + (squareX - this.targetX) * tensionProgress;
          finalTargetY = this.targetY + (squareY - this.targetY) * tensionProgress;
          finalTargetZ = this.targetZ + (squareZ - this.targetZ) * tensionProgress;
        }

        // Aplicação das rotações globais nos eixos X e Y
        let rX = finalTargetX * cosY - finalTargetZ * sinY;
        let rZ = finalTargetX * sinY + finalTargetZ * cosY;
        let rY = finalTargetY * cosX - rZ * sinX;
        rZ = finalTargetY * sinX + rZ * cosX;

        // Comportamento físico baseado nos estados
        if (state === 'decay') {
          // 2. Estado Decay: Explosão física agressiva idêntica ao carregamento da página
          this.vx += (Math.random() - 0.5) * 4.5 - (rX * 0.005);
          this.vy += (Math.random() - 0.5) * 4.5 - (rY * 0.005);
          this.vz += (Math.random() - 0.5) * 4.5 - (rZ * 0.005);

          this.vx *= 0.95;
          this.vy *= 0.95;
          this.vz *= 0.95;
        } else {
          // Atração normal para os alvos (seja montando a palavra ou o quadrado progressivo)
          const dx = rX - this.x;
          const dy = rY - this.y;
          const dz = rZ - this.z;

          const currentEase = state === 'assemble' ? this.ease * 0.8 : this.ease;
          const multi = state === 'hold' ? 0.35 : 0.2;

          this.vx += dx * currentEase * multi;
          this.vy += dy * currentEase * multi;
          this.vz += dz * currentEase * multi;

          this.vx *= this.friction;
          this.vy *= this.friction;
          this.vz *= this.friction;
        }

        // Clique do mouse provoca estouro extra manual e instantâneo
        if (clickBurst) {
          const angle = Math.random() * Math.PI * 2;
          const force = Math.random() * 26 + 12;
          this.vx = Math.cos(angle) * force;
          this.vy = Math.sin(angle) * force;
          this.vz = (Math.random() - 0.5) * 30;
        }

        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;
      }

      draw(context, isCustomPalette, width, height) {
        const fov = 400; 
        const scale = fov / (fov + this.z);

        const projectedX = width / 2 + this.x * scale;
        const projectedY = height / 2 + this.y * scale;
        const projectedSize = this.baseSize * scale;

        if (projectedSize <= 0) return;

        const alpha = Math.min(Math.max(scale * 0.75, 0.15), 1);

        let color;
        if (isCustomPalette) {
          color = this.targetX % 2 === 0 
            ? `rgba(38, 170, 255, ${alpha})` 
            : `rgba(105, 41, 255, ${alpha})`; 
        } else {
          color = this.targetX % 3 === 0 
            ? `rgba(0, 242, 254, ${alpha})` 
            : `rgba(127, 0, 255, ${alpha})`; 
        }

        context.fillStyle = color;
        context.beginPath();
        context.arc(projectedX, projectedY, projectedSize, 0, Math.PI * 2);
        context.fill();
      }
    }

    const particles = points.map(pt => new RotatingParticle3D(pt.targetX, pt.targetY, canvas.width, canvas.height));
    let triggerBurst = false;

    const animate = () => {
      ctx.fillStyle = 'rgba(3, 3, 8, 0.22)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      cycleTimer++;
      if (cycleTimer >= CYCLE_DURATION) {
        cycleTimer = 0;
        isFirstLoad = false; 
      }

      let currentState = 'assemble';
      let tensionProgress = 0;

      if (cycleTimer >= ATTRACT_TIME && cycleTimer < ATTRACT_TIME + HOLD_TIME) {
        currentState = 'hold'; 
      } else if (cycleTimer >= ATTRACT_TIME + HOLD_TIME && cycleTimer < ATTRACT_TIME + HOLD_TIME + TENSION_TIME) {
        currentState = 'tension';
        // Calcula o fator progressivo de 0 a 1 dentro do estágio de tensão
        tensionProgress = (cycleTimer - (ATTRACT_TIME + HOLD_TIME)) / TENSION_TIME;
      } else if (cycleTimer >= ATTRACT_TIME + HOLD_TIME + TENSION_TIME) {
        currentState = 'decay'; // Momento do estouro/explosão massiva
      }

      // Rotações dinâmicas de eixo baseadas na fase atual
      if (currentState === 'tension' || currentState === 'decay') {
        globalAngleY = Math.sin(Date.now() * 0.0025) * 0.6;
        globalAngleX = Math.cos(Date.now() * 0.002) * 0.4;
      } else {
        globalAngleY = Math.sin(Date.now() * 0.001) * 0.35;
        globalAngleX = 0;
      }

      particles.forEach(p => {
        // Se for o load inicial absoluto da página nos primeiros frames, força o estado solto
        const computedState = (isFirstLoad && cycleTimer < 45) ? 'decay' : currentState;
        p.update(computedState, triggerBurst, globalAngleX, globalAngleY, tensionProgress);
        p.draw(ctx, isClickedRef.current, canvas.width, canvas.height);
      });

      triggerBurst = false;
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    const handleClick = () => {
      triggerBurst = true;
      setIsClicked(prev => !prev);
    };

    canvas.addEventListener('click', handleClick);
    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('click', handleClick);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const scrollToPartners = () => {
    const section = document.getElementById('partners-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Container>
      <CanvasContainer>
        <CanvasStyled ref={canvasRef} />
      </CanvasContainer>

      <SocialProofContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1.5 }}
      >
        <AvatarStack>
          <Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Aluna DevClub" />
          <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Aluno DevClub" />
          <Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="Aluna DevClub" />
          <Avatar src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" alt="Aluno DevClub" />
          <Avatar src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80" alt="Aluna DevClub" />
        </AvatarStack>
        <ProofText>
          <span>+25 mil</span> alunos já passaram por aqui
        </ProofText>
      </SocialProofContainer>

      <ScrollIndicator
        onClick={scrollToPartners}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown size={20} 
            
          />
        </motion.div>
      </ScrollIndicator>
    </Container>
  );
}