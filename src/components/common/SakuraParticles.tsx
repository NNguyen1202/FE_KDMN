import { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  rotation: number;
  rotationSpeed: number;
}

export default function SakuraParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const petals: Petal[] = [];

    const PETAL_COUNT = 45;

    for (let i = 0; i < PETAL_COUNT; i++) {
      petals.push(createPetal());
    }

    function createPetal(): Petal {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: 8 + Math.random() * 10,
        speed: 0.6 + Math.random() * 1.5,
        drift: Math.random() * 2 - 1,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
      };
    }

    function drawPetal(p: Petal) {
      ctx.save();

      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      ctx.fillStyle = "#f8b7d3";

      ctx.beginPath();

      ctx.moveTo(0, -p.size);

      ctx.bezierCurveTo(
        p.size,
        -p.size,
        p.size,
        p.size,
        0,
        p.size * 1.3
      );

      ctx.bezierCurveTo(
        -p.size,
        p.size,
        -p.size,
        -p.size,
        0,
        -p.size
      );

      ctx.fill();

      ctx.restore();
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      petals.forEach((p) => {
        drawPetal(p);

        p.y += p.speed;
        p.x += Math.sin(p.rotation) * 0.8 + p.drift;

        p.rotation += p.rotationSpeed;

        if (p.y > height + 30) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
      });

      requestAnimationFrame(animate);
    }

    animate();

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
    />
  );
}