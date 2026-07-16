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
  font-family: 'Orbitron', sans-serif;
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
  margin-left: -12px; // Efeito de sobreposição elegante
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

const Subtitle = styled(motion.p)`
  font-size: 1rem;
  color: #5a6578;
  text-align: center;
  max-width: 600px;
  line-height: 1.6;
  z-index: 2;
  margin-top: 1rem;
  letter-spacing: 4px;
  font-weight: 700;
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

    // Canvas temporário para mapear os pontos do DEVCLUB
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

    // Controle refinado dos tempos do ciclo (Baseado em 60 FPS)
    let cycleTimer = 0;
    let globalAngleY = 0; 
    
    const DECAY_TIME = 120;       // 2 segundos se desintegrando e flutuando livremente
    const ATTRACT_TIME = 90;      // 1.5 segundos voando em direção às letras
    const HOLD_TIME = 150;        // 2.5 segundos travada e visível em 3D para leitura
    const CYCLE_DURATION = DECAY_TIME + ATTRACT_TIME + HOLD_TIME; // 360 frames (6 segundos total)

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

        this.ease = Math.random() * 0.04 + 0.02; // Aceleração de atração ligeiramente maior para montar rápido
        this.friction = 0.85; // Menor fricção para evitar oscilações excessivas ao travar
      }

      update(state, clickBurst, currentAngleY) {
        // Estado 1: Montando ou Mantendo travado para leitura
        if (state === 'assemble' || state === 'hold') {
          const cosY = Math.cos(currentAngleY);
          const sinY = Math.sin(currentAngleY);

          // Rotaciona os alvos no espaço 3D globalmente
          const rotatedTargetX = this.targetX * cosY - this.targetZ * sinY;
          const rotatedTargetZ = this.targetX * sinY + this.targetZ * cosY;

          const dx = rotatedTargetX - this.x;
          const dy = this.targetY - this.y;
          const dz = rotatedTargetZ - this.z;

          // Se estiver na fase de "hold" (segurar), aumenta a força para as partículas não tremerem
          const multi = state === 'hold' ? 0.35 : 0.22;

          this.vx += dx * this.ease * multi;
          this.vy += dy * this.ease * multi;
          this.vz += dz * this.ease * multi;

          this.vx *= this.friction;
          this.vy *= this.friction;
          this.vz *= this.friction;
        } 
        // Estado 2: Dispersando/Desintegrando
        else {
          this.vx += (Math.random() - 0.5) * 0.4 - (this.z * 0.0015); 
          this.vy += (Math.random() - 0.5) * 0.4;
          this.vz += (Math.random() - 0.5) * 0.4 + (this.x * 0.0015);

          this.vx *= 0.96;
          this.vy *= 0.96;
          this.vz *= 0.96;
        }

        if (clickBurst) {
          const angle = Math.random() * Math.PI * 2;
          const force = Math.random() * 22 + 8;
          this.vx = Math.cos(angle) * force;
          this.vy = Math.sin(angle) * force;
          this.vz = (Math.random() - 0.5) * 20;
        }

        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;

        if (this.z < -600) this.z = 600;
        if (this.z > 600) this.z = -600;
      }

      draw(context, isPinkPalette, width, height) {
        const fov = 400; 
        const scale = fov / (fov + this.z);

        const projectedX = width / 2 + this.x * scale;
        const projectedY = height / 2 + this.y * scale;
        const projectedSize = this.baseSize * scale;

        if (projectedSize <= 0) return;

        const alpha = Math.min(Math.max(scale * 0.75, 0.1), 1);

        let color;
        if (isPinkPalette) {
          color = this.targetX % 3 === 0 
            ? `rgba(255, 0, 127, ${alpha})` 
            : `rgba(255, 94, 98, ${alpha})`; 
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
      }

      // Máquina de estados baseada nos timers definidos
      let currentState = 'decay';
      if (cycleTimer >= DECAY_TIME && cycleTimer < DECAY_TIME + ATTRACT_TIME) {
        currentState = 'assemble'; // Voando para formar a palavra
      } else if (cycleTimer >= DECAY_TIME + ATTRACT_TIME) {
        currentState = 'hold'; // Palavra montada e perfeitamente legível
      }

      // Rotação contínua e suave de 360° no eixo Y
      globalAngleY += 0.009; 
      if (globalAngleY > Math.PI * 2) {
        globalAngleY = 0;
      }

      particles.forEach(p => {
        p.update(currentState, triggerBurst, globalAngleY);
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

  return (
    <Container>
      <CanvasContainer>
        <CanvasStyled ref={canvasRef} />
      </CanvasContainer>

      {/* Seção de Prova Social Substituindo o texto estático anterior */}
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
          <span>+30 mil</span> alunos já passaram por aqui
        </ProofText>
      </SocialProofContainer>

      <ScrollIndicator
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </ScrollIndicator>
    </Container>
  );
}