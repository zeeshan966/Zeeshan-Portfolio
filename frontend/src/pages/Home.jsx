import { useState, useEffect, useMemo, useCallback } from "react";

function useTypingEffect(fullText, typingSpeed = 100, backspaceSpeed = 50, pauseTime = 2000) {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setText(fullText.slice(0, index + 1));
        setIndex(index + 1);
        if (index + 1 === fullText.length) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        setText(fullText.slice(0, index));
        setIndex(index - 1);
        if (index === 0) {
          setIsDeleting(false);
        }
      }
    }, isDeleting ? backspaceSpeed : typingSpeed);
    return () => clearTimeout(timer);
  }, [index, isDeleting, fullText, typingSpeed, backspaceSpeed, pauseTime]);
  return text;
}

export default function Home() {
  const [darkMode, setDarkMode] = useState(true); // Default dark for neon effect
  const [githubRepos, setGithubRepos] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const typedText = useTypingEffect("MERN Stack Developer • DSA Specialist • C++ Programmer");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setDarkMode(savedTheme === "dark");
  }, []);

  const toggleTheme = useCallback(() => {
    setDarkMode(!darkMode);
    localStorage.setItem("theme", !darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    fetch("https://api.github.com/users/zeeshan966")
      .then(res => res.json())
      .then(data => setGithubRepos(data.public_repos || 0))
      .catch(() => setGithubRepos(0));
  }, []);

  const techStack = useMemo(() => [
    { name: "C++ with DSA", desc: "Expertise in Algorithms, Time Complexity, and solving 500+ problems on LeetCode/GFG.", color: "from-blue-600 to-cyan-500", glow: "shadow-blue-500/50" },
    { name: "OOPs Concepts", desc: "Solid understanding of Abstraction, Encapsulation, Inheritance, and Polymorphism.", color: "from-purple-600 to-blue-500", glow: "shadow-purple-500/50" },
    { name: "React.js", desc: "Building dynamic SPAs using Hooks, Redux Toolkit, and optimized component lifecycles.", color: "from-cyan-400 to-blue-600", glow: "shadow-cyan-400/50" },
    { name: "Node.js & Express", desc: "Developing scalable REST APIs, JWT authentication, and middle-ware integration.", color: "from-green-500 to-emerald-700", glow: "shadow-green-500/50" },
    { name: "MongoDB", desc: "NoSQL database management, Aggregation pipelines, and schema modeling.", color: "from-emerald-400 to-green-600", glow: "shadow-emerald-500/50" },
    { name: "Tailwind CSS", desc: "Modern UI/UX with utility-first classes, Glassmorphism, and Responsive Design.", color: "from-blue-400 to-indigo-600", glow: "shadow-blue-400/50" },
    { name: "Git & GitHub", desc: "Version control, collaborative development, and maintaining 20+ public repositories.", color: "from-gray-600 to-zinc-900", glow: "shadow-white/20" },
  ], []);

  return (
    <section className={`relative min-h-screen flex flex-col items-center justify-start px-4 py-16 overflow-hidden ${darkMode ? 'bg-[#050505] text-white' : 'bg-gray-100 text-black'} font-sans transition-colors duration-500`}>
      {/* Dynamic Background Glow */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none animate-pulse"></div>

      <div className="relative z-10 max-w-7xl w-full flex flex-col gap-12">
        <button onClick={toggleTheme} className="self-end p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:scale-110 transition-all shadow-xl">
          {darkMode ? "☀️" : "🌙"}
        </button>

        <div className="space-y-6 text-center">
          <div className="inline-block px-4 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[10px] font-black tracking-widest uppercase">
            Full-Stack Portfolio 2026
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent uppercase">
            Zeeshan Ahmad
          </h1>
          <p className="text-lg md:text-2xl text-blue-400/80 font-mono italic min-h-[1.5em]">
            {typedText}<span className="inline-block w-[2px] h-6 bg-cyan-400 ml-1 animate-blink"></span>
          </p>
        </div>

        <div className="space-y-12 mt-10 w-full flex flex-col items-center">
          <div className="flex items-center gap-6 w-[90%]">
            <h2 className="text-xs font-black tracking-[0.3em] uppercase text-blue-500/50 text-nowrap">Core Tech Stack</h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-blue-500/50 to-transparent"></div>
          </div>

          {/* Cards Slider */}
          <div 
            className="w-full overflow-hidden relative h-[450px] group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div 
              className="flex gap-8 absolute left-0 will-change-transform animate-slide-cards py-10"
              style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
            >
              {[...techStack, ...techStack].map((tech, idx) => (
                <div key={idx} className="flip-card flex-shrink-0 w-72 h-80 group/card">
                  <div className="flip-card-inner">
                    {/* Front */}
                    <div className="flip-card-front rounded-3xl border border-white/10 bg-zinc-900/50 backdrop-blur-xl shadow-2xl overflow-hidden group-hover/card:border-blue-500/50 transition-colors">
                      <div className={`absolute inset-0 opacity-5 bg-gradient-to-br ${tech.color}`}></div>
                      <div className="relative h-full w-full flex flex-col items-center justify-center gap-6 p-8">
                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${tech.color} flex items-center justify-center text-white text-4xl font-black shadow-[0_0_20px_rgba(0,0,0,0.3)] ${tech.glow} group-hover/card:scale-110 transition-transform duration-500`}>
                          {tech.name.charAt(0)}
                        </div>
                        <h3 className="text-xl font-black text-white tracking-tight uppercase text-center">{tech.name}</h3>
                      </div>
                    </div>

                    {/* Back */}
                    <div className="flip-card-back rounded-3xl border border-blue-500/30 bg-[#0a0a0a] p-8 text-center flex flex-col items-center justify-center shadow-[inset_0_0_20px_rgba(59,130,246,0.1)]">
                      <p className="text-gray-300 text-sm leading-relaxed font-medium">{tech.desc}</p>
                      <div className="mt-6 h-[2px] w-12 bg-blue-500/50 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-cards {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(calc(-288px * 7 - 2rem * 7), 0, 0); }
        }
        .animate-slide-cards { 
          animation: slide-cards 25s linear infinite; 
        }

        .flip-card { perspective: 1200px; }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform-style: preserve-3d;
        }
        
        .flip-card:hover .flip-card-inner { 
          transform: rotateY(180deg); 
        }

        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
        }
        .flip-card-back { transform: rotateY(180deg); }
        
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .animate-blink { animation: blink 0.8s infinite; }
      `}</style>
    </section>
  );
}