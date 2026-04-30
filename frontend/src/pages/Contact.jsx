import { useState, useCallback } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  // --- API Configuration ---
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://zeeshan-portfolio-1.onrender.com";

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    // Professional validation messages
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("Required fields are missing ⚠️");
      return;
    }

    setStatus("Establishing connection... 🚀");

    try {
      const response = await fetch(`${BASE_URL}/api/messages/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("Transmission Successful ✅");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus(""), 5000);
      } else {
        setStatus("Error: Failed to synchronize ❌");
      }
    } catch (error) {
      console.error("Transmission Error:", error);
      setStatus("System Offline: Connection Refused 🔌");
    }
  }, [formData, BASE_URL]);

  return (
    <section className="relative bg-[#050505] min-h-screen flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden selection:bg-yellow-500/30">
      
      {/* --- Responsive Ambient Glows --- */}
      <div className="absolute top-0 right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-yellow-500/10 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-0 left-[-10%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-yellow-600/5 blur-[80px] rounded-full"></div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 relative z-10">
        
        {/* --- Left Side: Content --- */}
        <div className="flex flex-col justify-center space-y-8 md:space-y-12">
          <div className="space-y-4 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <span className="w-8 md:w-12 h-[2px] bg-yellow-500"></span>
              <p className="text-yellow-500 font-black tracking-[0.3em] text-[10px] uppercase">Strategic Partnership</p>
            </div>
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-white italic uppercase tracking-tighter leading-[0.9] md:leading-[0.85]">
              Let's <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Collaborate</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <div className="group p-5 md:p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-yellow-500/20 transition-all duration-500">
              <p className="text-zinc-600 group-hover:text-yellow-500/50 text-[9px] font-black uppercase tracking-widest mb-1 transition-colors">Base Location</p>
              <p className="text-zinc-300 font-bold text-sm md:text-base italic uppercase tracking-tighter">Uttar Pradesh, India</p>
            </div>
            <div className="group p-5 md:p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-yellow-500/20 transition-all duration-500">
              <p className="text-zinc-600 group-hover:text-yellow-500/50 text-[9px] font-black uppercase tracking-widest mb-1 transition-colors">Availability</p>
              <p className="text-zinc-300 font-bold text-sm md:text-base italic uppercase tracking-tighter">Open for Opportunities</p>
            </div>
          </div>
        </div>

        {/* --- Right Side: The Form --- */}
        <div className="relative">
          <div className="relative bg-[#0a0a0c]/80 p-6 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-white/5 shadow-2xl backdrop-blur-3xl overflow-hidden">
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 md:gap-7 relative z-10">
              
              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-4">Full Identity</label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="e.g. Zeeshan Ahmad" 
                  value={formData.name} 
                  onChange={handleChange} 
                  className="w-full bg-white/[0.03] p-4 md:p-5 rounded-2xl text-white outline-none border border-white/5 focus:border-yellow-500/40 focus:bg-white/[0.05] transition-all text-sm font-medium placeholder:text-zinc-700" 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-4">Contact Gateway</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="professional@domain.com" 
                  value={formData.email} 
                  onChange={handleChange} 
                  className="w-full bg-white/[0.03] p-4 md:p-5 rounded-2xl text-white outline-none border border-white/5 focus:border-yellow-500/40 focus:bg-white/[0.05] transition-all text-sm font-medium placeholder:text-zinc-700" 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-4">Briefing Details</label>
                <textarea 
                  name="message" 
                  placeholder="Describe the scope of project or inquiry..." 
                  value={formData.message} 
                  onChange={handleChange} 
                  className="w-full bg-white/[0.03] p-4 md:p-5 rounded-2xl text-white outline-none border border-white/5 focus:border-yellow-500/40 focus:bg-white/[0.05] transition-all text-sm font-medium h-32 md:h-40 resize-none placeholder:text-zinc-700" 
                />
              </div>
              
              {status && (
                <div className={`py-3 px-6 rounded-2xl text-center text-[10px] font-black uppercase tracking-[0.1em] border backdrop-blur-md transition-all
                  ${status.includes('Successful') 
                    ? 'bg-green-500/10 border-green-500/20 text-green-500' 
                    : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500'}`}>
                  {status}
                </div>
              )}
              
              <button 
                type="submit" 
                className="group relative overflow-hidden bg-yellow-500 p-5 rounded-2xl text-black font-black uppercase tracking-[0.2em] text-[11px] transition-all duration-500 active:scale-90 hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] shadow-lg"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Initiate Transmission
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              </button>
            </form>
          </div>

          <div className="flex justify-center mt-8 lg:hidden">
             <div className="w-1 h-8 bg-gradient-to-b from-yellow-500 to-transparent rounded-full opacity-20"></div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}