import { useMemo, useState, useRef, useEffect } from "react";

const BentoCard = ({ card, color, delay }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  // Scroll animation trigger for mobile
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      style={{ 
        transitionDelay: `${delay}ms`,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
        opacity: isVisible ? 1 : 0
      }}
      className={`group relative w-full lg:flex-1 perspective-1000 transition-all duration-700 ease-out`}
    >
      {/* Background Neon Aura (Animated) */}
      <div 
        className="absolute -inset-1 rounded-[2.5rem] opacity-20 group-hover:opacity-60 blur-2xl transition-all duration-700 pointer-events-none"
        style={{ backgroundColor: color }}
      ></div>

      <div
        className="relative h-full z-10 bg-[#0a0a0c]/80 backdrop-blur-3xl border border-white/5 p-8 rounded-[2.5rem] 
                   transition-all duration-500 ease-out
                   group-hover:-translate-y-3 group-hover:border-white/20 overflow-hidden shadow-2xl group-active:scale-[0.98]"
      >
        {/* Spot Light Effect - Works on touch too! */}
        <div
          className="absolute inset-0 z-0 transition-opacity duration-500 opacity-40 md:opacity-0 md:group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle 300px at ${mousePos.x || 50}% ${mousePos.y || 50}%, ${color}33, transparent)`,
          }}
        ></div>

        <div className="relative z-10 h-full flex flex-col gap-6">
          {/* Tech Icon Container with 3D shadow */}
          <div 
            className="relative w-14 h-14 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-center text-2xl transition-transform group-hover:rotate-[10deg] duration-500 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]"
            style={{ 
              borderBottom: `3px solid ${color}`, 
              boxShadow: `0 15px 30px -10px ${color}66` 
            }}
          >
            {card.icon}
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-black tracking-tighter text-white uppercase italic group-hover:text-yellow-500 transition-colors">
              {card.title}
            </h3>
            <p className="text-sm leading-relaxed text-zinc-400 font-medium group-hover:text-zinc-200 transition-colors">
              {card.desc}
            </p>
          </div>

          {/* Dynamic Progress Bar */}
          <div className="mt-auto pt-4">
             <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ease-out ${isVisible ? 'w-full' : 'w-0'}`}
                  style={{ 
                    backgroundColor: color, 
                    boxShadow: `0 0 15px ${color}`,
                    transitionDelay: `${delay + 300}ms`
                  }}
                ></div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function About() {
  const aboutCards = useMemo(
    () => [
      { title: "Full-Stack Dev", icon: "⚡", color: "#60a5fa", desc: "Proficient in MERN Stack. Developing optimized REST APIs and interactive architectures." },
      { title: "DSA in C++", icon: "⚙️", color: "#2DD4BF", desc: "Deep understanding of Data Structures and Algorithms with complexity optimization." },
      { title: "UI / UX Focus", icon: "🎨", color: "#A855F7", desc: "Crafting modern, responsive interfaces using Tailwind CSS and glassmorphism." },
      { title: "Architecture", icon: "🏗️", color: "#FACC15", desc: "Strong grasp of OOPs to build scalable, maintainable and professional software." }
    ],
    []
  );

  return (
    <section className="relative bg-[#050505] text-white py-24 px-6 overflow-hidden">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-yellow-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-[2px] bg-yellow-500"></span>
              <p className="text-yellow-500 font-black tracking-[0.4em] text-[10px] uppercase">My Core Stack</p>
            </div>
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-[0.9]">
              Expertise <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Overview</span>
            </h2>
          </div>
          <p className="text-zinc-500 max-w-sm text-sm font-bold border-l-2 border-yellow-500/20 pl-6 leading-relaxed">
            Blending computational logic with aesthetic design to build the next generation of web applications.
          </p>
        </div>

        {/* --- High Impact Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {aboutCards.map((card, index) => (
            <BentoCard 
              key={index} 
              card={card} 
              color={card.color} 
              delay={index * 150} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}