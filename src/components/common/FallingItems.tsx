/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

const items = ["🍂", "🍁", "✨", "🌸", "🥮", "⭐"];

export default function FallingItems() {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const arr = Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      icon: items[Math.floor(Math.random() * items.length)],
      left: Math.random() * 100,
      size: 22 + Math.random() * 18,
      duration: 10 + Math.random() * 12,
      delay: Math.random() * 10,
    }));

    setParticles(arr);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-[9997] opacity-50">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-fall"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.icon}
        </div>
      ))}
    </div>
  );
}
