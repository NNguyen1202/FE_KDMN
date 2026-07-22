import FallingItems from "./FallingItems";

export default function MoonFestivalDecoration() {
  return (
    <>
      {/* Moon */}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[9998] pointer-events-none">
        <div className="relative">
             {/* Moon Glow */}
          <div className="absolute h-72 w-72 rounded-full bg-yellow-200/35 blur-[70px]" />
          <div className="text-[120px] drop-shadow-2xl animate-pulse opacity-50">🌕</div>

          <div className="absolute inset-0 blur-3xl bg-yellow-200 opacity-40 rounded-full scale-125" />
          {/* Left Cloud */}
          <div
            className="
              absolute
              -left-28
              top-10
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
              top-16
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
