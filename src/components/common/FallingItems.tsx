// import { useEffect, useState } from "react";

// const items = ["❄"];

// export default function FallingItems() {
//   const [particles, setParticles] = useState<any[]>([]);

//   useEffect(() => {
//     const arr = Array.from({ length: 35 }).map((_, i) => ({
//       id: i,
//       icon: items[Math.floor(Math.random() * items.length)],
//       left: Math.random() * 100,
//       size: 22 + Math.random() * 18,
//       duration: 10 + Math.random() * 12,
//       delay: Math.random() * 10,
//     }));

//     setParticles(arr);
//   }, []);

//   return (
//     <div className="pointer-events-none fixed inset-0 overflow-hidden z-[9997] opacity-50">
//       {particles.map((p) => (
//         <div
//           key={p.id}
//           className="absolute animate-fall"
//           style={{
//             left: `${p.left}%`,
//             fontSize: `${p.size}px`,
//             animationDuration: `${p.duration}s`,
//             animationDelay: `${p.delay}s`,
//           }}
//         >
//           {p.icon}
//         </div>
//       ))}
//     </div>
//   );
// }

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function FallingItems() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const arr: Particle[] = Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 4 + Math.random() * 8,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 10,
      opacity: 0.35 + Math.random() * 0.55,
    }));

    setParticles(arr);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-[9997]">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full national-snow"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}