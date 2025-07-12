import { useEffect, useRef } from "react";
import styled from "styled-components";

interface FloatingProps {
  src: string;
  alt: string;
  enableAnimation?: boolean;
  style?: React.CSSProperties;
  amplitudeX?: number;
  amplitudeY?: number;
  interval?: number; // tempo entre movimentos em ms
}

export const FloatingImage: React.FC<FloatingProps> = ({
  src,
  alt,
  enableAnimation,
  style,
  amplitudeX = 20,
  amplitudeY = 20,
  interval = 1500,
}) => {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!enableAnimation) {
      el.style.transform = "none";
      return;
    }

    const move = () => {
      const offsetX = (Math.random() * 2 - 1) * amplitudeX;
      const offsetY = (Math.random() * 2 - 1) * amplitudeY;
      el.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    };

    move(); // primeira posição
    const id = setInterval(move, interval);

    return () => clearInterval(id);
  }, [amplitudeX, amplitudeY, interval, enableAnimation]);

  return <Image src={src} alt={alt} style={style} ref={ref} />;
};

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
  transform-origin: center;
  backface-visibility: hidden;
  will-change: transform;
  pointer-events: none;
  transition: transform 1500ms ease-in-out;
`;
