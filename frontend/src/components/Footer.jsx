import { useMemo } from "react";

export default function Footer() {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="w-full bg-[#050505] border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pb-10 border-b border-white/5">
          
          {/* Left Side: Brand & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center text-black font-black text-sm shadow-[0_0_15px_rgba(234,179,8,0.2)] group-hover:scale-110 transition-transform">
                Z
              </div>
              <span className="text-lg font-black tracking-tighter text-white uppercase italic">
                Zeeshan<span className="text-yellow-500">.</span>Dev
              </span>
            </div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mt-2">
              © {currentYear} All rights reserved. Built with ❤️ by Zeeshan.
            </p>
          </div>

          {/* Right Side: Social Pill Links */}
          <div className="flex items-center gap-3">
            {[
              { name: "GitHub", url: "https://github.com/zeeshan966" },
              { name: "LinkedIn", url: "https://www.linkedin.com/in/zeeshan-ahmad-44a200311" },
              { name: "Email", url: "mailto:zeeshankhan30395@gmail.com" }
            ].map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-full border border-white/5 bg-white/5 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-yellow-500 hover:border-yellow-500/50 hover:bg-yellow-500/5 transition-all duration-300 active:scale-90"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Small Line: Just for Aesthetics */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
          <span className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.5em]">
            Jaypee University of Engineering and Technology
          </span>
        </div>
      </div>
    </footer>
  );
}