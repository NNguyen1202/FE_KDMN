import { useEffect, useState } from "react";
import FallingItems from "./FallingItems";

export default function MoonFestivalDecoration() {
  console.log("MoonFestivalDecoration render");
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const load = () => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      console.log("User:", user);
      console.log("Moon:", user?.settings?.moonFestivalEffect);

      setEnabled(user?.settings?.moonFestivalEffect ?? true);
    };

    load();

    window.addEventListener("moon-effect-changed", load);

    return () => {
      window.removeEventListener("moon-effect-changed", load);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <>
      {/* Moon */}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[9998] pointer-events-none">
        <div className="relative">
          {/* Moon Glow */}
          {/* <div className="absolute h-72 w-72 rounded-full bg-yellow-200/35 blur-[70px]" /> */}
          <div className="absolute h-72 w-72 rounded-full bg-pink-200/35 blur-[70px]" />
          <div className="text-[120px] drop-shadow-2xl animate-pulse opacity-30">
            {/* 🌕 */}
            <img className="h-40 w-70 mt-14 rounded-full" src="https://vipcorel.com/attachments/18765-market-ky-niem-81-nam-quoc-khanh-nuoc-cong-hoa-xhcn-png.34052/"></img>
          </div>

          <div className="absolute inset-0 blur-3xl bg-yellow-200 opacity-40 rounded-full scale-125" />
          {/* Left Cloud */}
          <div
            className="
              absolute
              -left-28
              top-5
              text-[60px]
              opacity-75
              animate-[cloudFloatLeft_10s_ease-in-out_infinite]
            "
          >
            ☁️
          </div>

          {/* Right Cloud */}
          <div
            className="
              absolute
              -right-28
              top-14
              text-[55px]
              opacity-70
              animate-[cloudFloatRight_12s_ease-in-out_infinite]
            "
          >
            ☁️
          </div>
        </div>
      </div>

      {/* Left lantern */}
      <div className="fixed top-0 left-8 z-[9998] pointer-events-none opacity-50">
        <div className="h-24 w-[3px] bg-yellow-700 mx-auto" />

        <div className="text-[82px] animate-[swing_3s_ease-in-out_infinite] origin-top">
          🏮
        </div>
      </div>

      {/* Right lantern */}
      <div className="fixed top-0 right-8 z-[9998] pointer-events-none opacity-50">
        <div className="h-24 w-[3px] bg-yellow-700 mx-auto" />

        <div className="text-[82px] animate-[swing_3s_ease-in-out_infinite] origin-top">
          🏮
        </div>
      </div>

      <FallingItems />
    </>
  );
}

// import { useEffect, useState } from "react";
// import FallingItems from "./FallingItems";

// export default function MoonFestivalDecoration() {
//   console.log("NationalDayDecoration render");

//   const [enabled, setEnabled] = useState(true);

//   useEffect(() => {
//     const load = () => {
//       const user = JSON.parse(localStorage.getItem("user") || "{}");

//       console.log("User:", user);
//       console.log("National Day:", user?.settings?.moonFestivalEffect);

//       // Giữ nguyên setting cũ để không ảnh hưởng logic hiện tại
//       setEnabled(user?.settings?.moonFestivalEffect ?? true);
//     };

//     load();

//     // Giữ nguyên event cũ
//     window.addEventListener("moon-effect-changed", load);

//     return () => {
//       window.removeEventListener("moon-effect-changed", load);
//     };
//   }, []);

//   if (!enabled) {
//     return null;
//   }

//   return (
//     <>
//       {/* =========================
//           CỜ VIỆT NAM - TRUNG TÂM
//           ========================= */}
//       <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[9998] pointer-events-none">
//         <div className="relative flex flex-col items-center">
//           {/* Glow */}
//           <div className="absolute top-4 w-72 h-32 rounded-full bg-red-500/20 blur-[60px]" />

//           {/* Cờ */}
//           <img
//             alt="Quốc khánh Việt Nam 2/9"
//             className="
//               relative
//               w-[140px]
//               max-w-[30vw]
//               h-auto
//               object-contain
//               drop-shadow-[0_8px_20px_rgba(0,0,0,0.3)]
//               animate-pulse
//             "
//             src="https://i.ibb.co/kVzhrknM/h-nh-nh-2026-08-19-165424019.png"
//           ></img>

//           {/* Tiêu đề */}
//           <div className="relative -mt-1 text-center">
//             <div className="text-sm font-bold text-red-600 drop-shadow-md">
//               QUỐC KHÁNH VIỆT NAM
//             </div>

//             <div className="text-xs font-extrabold text-yellow-600">
//               02 • 09 • 2026
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================
//           CỜ BÊN TRÁI
//           ========================= */}
//       <div className="fixed top-0 left-8 z-[9998] pointer-events-none opacity-80">
//         <div className="h-20 w-[3px] bg-yellow-600 mx-auto" />

//         <div className="text-[72px] animate-[swing_3s_ease-in-out_infinite] origin-top">
//           🇻🇳
//         </div>
//       </div>

//       {/* =========================
//           CỜ BÊN PHẢI
//           ========================= */}
//       <div className="fixed top-0 right-8 z-[9998] pointer-events-none opacity-80">
//         <div className="h-20 w-[3px] bg-yellow-600 mx-auto" />

//         <div className="text-[72px] animate-[swing_3s_ease-in-out_infinite] origin-top">
//           🇻🇳
//         </div>
//       </div>

//       {/* =========================
//           SAO VÀNG HAI BÊN
//           ========================= */}
//       <div className="fixed top-40 left-16 z-[9998] pointer-events-none">
//         <div className="text-[38px] opacity-70 animate-pulse">⭐</div>
//       </div>

//       <div className="fixed top-52 right-16 z-[9998] pointer-events-none">
//         <div className="text-[34px] opacity-70 animate-pulse">⭐</div>
//       </div>

//       {/* =========================
//           DẢI TRANG TRÍ ĐỎ - VÀNG
//           ========================= */}
//       <div className="fixed top-0 left-0 right-0 z-[9997] pointer-events-none">
//         <div className="h-1 bg-red-600" />
//         <div className="h-[3px] bg-yellow-400 opacity-90" />
//       </div>

//       {/* =========================
//           HIỆU ỨNG RƠI
//           ========================= */}
//       <FallingItems />
//     </>
//   );
// }
