// src/pages/NationalDay/NationalDayPage.tsx

import { useNavigate } from "react-router-dom";

const fireworks = [
  { left: "8%", top: "18%", delay: "0s", scale: 1 },
  { left: "24%", top: "32%", delay: "1.8s", scale: 0.7 },
  { left: "48%", top: "15%", delay: "0.8s", scale: 1.2 },
  { left: "72%", top: "28%", delay: "2.5s", scale: 0.8 },
  { left: "88%", top: "15%", delay: "1.3s", scale: 1 },
  { left: "15%", top: "60%", delay: "3.2s", scale: 0.6 },
  { left: "82%", top: "58%", delay: "2s", scale: 0.7 },
];

const stars = [
  { left: "5%", top: "10%", delay: "0s" },
  { left: "18%", top: "20%", delay: "1s" },
  { left: "32%", top: "12%", delay: "2s" },
  { left: "55%", top: "25%", delay: "0.5s" },
  { left: "68%", top: "10%", delay: "1.5s" },
  { left: "92%", top: "25%", delay: "2.5s" },
  { left: "12%", top: "78%", delay: "1.2s" },
  { left: "90%", top: "75%", delay: "0.7s" },
];

export default function NationalDayPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* =========================
          ẢNH BANNER
          ========================= */}
      <img
        src="https://i.ibb.co/Rp9XcB23/h-nh-nh-2026-08-19-172152974.png"
        alt="Quốc khánh Việt Nam 2/9/2026"
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          object-center
        "
      />

      {/* =========================
          LỚP PHỦ
          ========================= */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-b
          from-black/10
          via-transparent
          to-black/50
        "
      />

      {/* Ánh sáng chuyển động */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="national-light national-light-1" />
        <div className="national-light national-light-2" />
      </div>

      {/* =========================
          SAO LẤP LÁNH
          ========================= */}
      {stars.map((star, index) => (
        <div
          key={index}
          className="absolute z-10 pointer-events-none text-yellow-300"
          style={{
            left: star.left,
            top: star.top,
            animationDelay: star.delay,
          }}
        >
          <div className="national-star">★</div>
        </div>
      ))}

      {/* =========================
          PHÁO HOA
          ========================= */}
      {fireworks.map((firework, index) => (
        <div
          key={index}
          className="absolute z-10 pointer-events-none"
          style={{
            left: firework.left,
            top: firework.top,
            animationDelay: firework.delay,
            transform: `scale(${firework.scale})`,
          }}
        >
          <div className="firework">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      ))}

      {/* =========================
          NÚT TRÊN GÓC PHẢI
          ========================= */}
      <div className="absolute top-8 right-8 md:top-10 md:right-20 z-30">
        <button
          onClick={() => navigate("/home")}
          className="
            group
            relative
            overflow-hidden
            px-7
            py-3
            rounded-full
            bg-white/95
            text-red-700
            font-bold
            shadow-[0_0_30px_rgba(255,215,0,0.45)]
            backdrop-blur-md
            hover:scale-105
            hover:bg-yellow-300
            transition-all
            duration-300
          "
        >
          <span className="relative z-10 flex items-center gap-2">
            <span className="text-xl">🏠</span>
            Vào trang chủ
          </span>

          <div
            className="
              absolute
              inset-0
              -translate-x-full
              group-hover:translate-x-full
              transition-transform
              duration-700
              bg-gradient-to-r
              from-transparent
              via-white/70
              to-transparent
            "
          />
        </button>
      </div>

      {/* =========================
          DẢI CHỮ CHẠY LIÊN TỤC
          ========================= */}
      <div
        className="
    absolute
    bottom-0
    left-0
    right-0
    z-30
    h-14
    overflow-hidden
    bg-red-800/80
    backdrop-blur-md
    border-t
    border-yellow-400/70
  "
      >
        <div className="national-marquee-track">
          {/* ===== NHÓM 1 ===== */}
          <div className="national-marquee">
            <span>⭐ CHÀO MỪNG QUỐC KHÁNH VIỆT NAM ⭐</span>

            <span>⭐ 02 • 09 • 2026 ⭐</span>

            <span>⭐ ĐỘC LẬP • TỰ DO • HẠNH PHÚC ⭐</span>

            <span>⭐ CHÀO MỪNG 81 NĂM QUỐC KHÁNH ⭐</span>
          </div>

          {/* ===== NHÓM 2 - GIỐNG HỆT NHÓM 1 ===== */}
          <div className="national-marquee" aria-hidden="true">
            <span>⭐ CHÀO MỪNG QUỐC KHÁNH VIỆT NAM ⭐</span>

            <span>⭐ 02 • 09 • 2026 ⭐</span>

            <span>⭐ ĐỘC LẬP • TỰ DO • HẠNH PHÚC ⭐</span>

            <span>⭐ CHÀO MỪNG 81 NĂM QUỐC KHÁNH ⭐</span>
          </div>
        </div>
      </div>

      {/* =========================
          DẢI VIỀN TRÊN
          ========================= */}
      <div className="absolute top-0 left-0 right-0 z-30 pointer-events-none">
        <div className="h-1 bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.8)]" />
      </div>

      {/* =========================
          CSS ANIMATION
          ========================= */}
      <style>{`
        /* =========================
           PHÁO HOA
           ========================= */

        .firework {
          position: relative;
          width: 10px;
          height: 10px;
          animation: fireworkBurst 4s ease-in-out infinite;
        }

        .firework span {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 3px;
          height: 45px;
          border-radius: 999px;
          background: linear-gradient(
            to bottom,
            #fff7a8,
            #ffd700,
            transparent
          );
          transform-origin: center bottom;
          opacity: 0;
        }

        .firework span:nth-child(1) {
          transform: translate(-50%, -100%) rotate(0deg);
        }

        .firework span:nth-child(2) {
          transform: translate(-50%, -100%) rotate(30deg);
        }

        .firework span:nth-child(3) {
          transform: translate(-50%, -100%) rotate(60deg);
        }

        .firework span:nth-child(4) {
          transform: translate(-50%, -100%) rotate(90deg);
        }

        .firework span:nth-child(5) {
          transform: translate(-50%, -100%) rotate(120deg);
        }

        .firework span:nth-child(6) {
          transform: translate(-50%, -100%) rotate(150deg);
        }

        .firework span:nth-child(7) {
          transform: translate(-50%, -100%) rotate(180deg);
        }

        .firework span:nth-child(8) {
          transform: translate(-50%, -100%) rotate(210deg);
        }

        .firework span:nth-child(9) {
          transform: translate(-50%, -100%) rotate(240deg);
        }

        .firework span:nth-child(10) {
          transform: translate(-50%, -100%) rotate(270deg);
        }

        .firework span:nth-child(11) {
          transform: translate(-50%, -100%) rotate(300deg);
        }

        .firework span:nth-child(12) {
          transform: translate(-50%, -100%) rotate(330deg);
        }

        @keyframes fireworkBurst {
          0% {
            opacity: 0;
            transform: scale(0.1);
          }

          8% {
            opacity: 1;
            transform: scale(0.4);
          }

          15% {
            opacity: 1;
            transform: scale(1);
          }

          30% {
            opacity: 0;
            transform: scale(1.25);
          }

          100% {
            opacity: 0;
            transform: scale(0.1);
          }
        }

        .firework span {
          animation: fireworkRay 4s ease-out infinite;
        }

        @keyframes fireworkRay {
          0% {
            opacity: 0;
            height: 5px;
          }

          10% {
            opacity: 1;
            height: 15px;
          }

          20% {
            opacity: 1;
            height: 55px;
          }

          35% {
            opacity: 0;
            height: 70px;
          }

          100% {
            opacity: 0;
          }
        }

        /* =========================
           SAO
           ========================= */

        .national-star {
          font-size: 22px;
          filter: drop-shadow(0 0 8px #ffd700);
          animation: starTwinkle 2.5s ease-in-out infinite;
        }

        @keyframes starTwinkle {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(0.6) rotate(0deg);
          }

          50% {
            opacity: 1;
            transform: scale(1.4) rotate(45deg);
          }
        }

        /* =========================
           ÁNH SÁNG
           ========================= */

        .national-light {
          position: absolute;
          width: 40vw;
          height: 100vh;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.15;
        }

        .national-light-1 {
          left: -20%;
          top: -30%;
          background: #ff0000;
          animation: lightMove1 10s ease-in-out infinite alternate;
        }

        .national-light-2 {
          right: -20%;
          bottom: -30%;
          background: #ffd700;
          animation: lightMove2 12s ease-in-out infinite alternate;
        }

        @keyframes lightMove1 {
          from {
            transform: translate(0, 0);
          }

          to {
            transform: translate(35vw, 20vh);
          }
        }

        @keyframes lightMove2 {
          from {
            transform: translate(0, 0);
          }

          to {
            transform: translate(-30vw, -20vh);
          }
        }

/* =========================
   CHỮ CHẠY LIÊN TỤC
   ========================= */

.national-marquee-track {
  display: flex;
  width: max-content;
  height: 100%;

  animation: nationalMarquee 22s linear infinite;

  will-change: transform;
}

.national-marquee {
  display: flex;
  align-items: center;

  height: 100%;

  /* Quan trọng:
     Không được co lại */
  flex-shrink: 0;

  gap: 70px;

  /* Khoảng cách cuối nhóm
     phải bằng khoảng cách giữa 2 nhóm */
  padding-right: 70px;

  white-space: nowrap;

  color: #fff;

  font-size: 16px;
  font-weight: 800;

  letter-spacing: 0.08em;

  text-shadow:
    0 0 8px rgba(255, 215, 0, 0.8),
    0 2px 4px rgba(0, 0, 0, 0.5);
}

/* 
   Chạy đúng 1 nhóm.
   Khi nhóm 1 đi hết:
   nhóm 2 đã nằm đúng vị trí thay thế.
*/
@keyframes nationalMarquee {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}

        @media (max-width: 768px) {
          .national-star {
            font-size: 16px;
          }
          
          .national-marquee-track {
            animation-duration: 18s;
          }

          .national-marquee {
            font-size: 13px;
            gap: 40px;
            animation-duration: 10s;
          }

          .firework {
            transform: scale(0.7);
          }
        }
      `}</style>
    </div>
  );
}
