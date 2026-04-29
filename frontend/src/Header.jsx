export default function Header() {
  return (
    <div className="relative overflow-hidden py-24 px-4 text-center bg-black">
      {/* Background Neon Accent Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 group inline-block">
        <h1
          className="
            inline-block
            text-4xl sm:text-5xl md:text-6xl lg:text-7xl
            font-black tracking-tighter
            text-white
            transition-all duration-300 ease-out
            hover:scale-105
            [text-shadow:0_0_15px_rgba(255,255,255,0.3)]
            hover:[text-shadow:0_0_20px_rgba(255,255,255,0.6)]
          "
        >
          Hello, I'm{" "}
          <span
            className="
              inline-block
              bg-gradient-to-r from-cyan-300 via-blue-500 to-cyan-300
              bg-clip-text text-transparent
              transition-all duration-300 ease-out
              hover:scale-110
              hover:-translate-y-1
              cursor-pointer
              animate-slow-rotate
              
              /* Neon Glow Effect */
              [text-shadow:0_0_15px_rgba(34,211,238,0.7),0_0_30px_rgba(59,130,246,0.5)]
              hover:[text-shadow:0_0_20px_rgba(34,211,238,1),0_0_40px_rgba(59,130,246,0.8),0_0_60px_rgba(59,130,246,0.6)]
            "
          >
            Zeeshan Ahmad
          </span>
        </h1>

        {/* Neon Underline */}
        <div className="mt-8 flex justify-center">
          <div
            className="
              h-1.5
              w-28 md:w-36
              rounded-full
              bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400
              shadow-[0_0_15px_rgba(59,130,246,0.7)]
              transition-all duration-500 ease-out
              group-hover:w-56 md:group-hover:w-72
              group-hover:shadow-[0_0_25px_rgba(59,130,246,0.9),0_0_45px_rgba(34,211,238,0.7)]
              relative
            "
          >
            {/* Pulsating Inner Neon Core */}
            <div 
              className="
                absolute inset-0 
                bg-white
                blur-[1px]
                opacity-70
                rounded-full
              "
            />
          </div>
        </div>
      </div>
    </div>
  );
}