import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // --- API Configuration ---
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://zeeshan-portfolio-1.onrender.com";

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        navigate("/admin/messages");
      } else {
        setError(data.msg || "Authentication Failed: Access Denied ❌");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Network Protocol Error: Server Unreachable 🔌");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] relative overflow-hidden px-4">
      
      {/* --- Background Decorative Elements --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-yellow-500/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-yellow-600/5 blur-[120px] rounded-full"></div>

      <div className="relative w-full max-w-md group">
        {/* Animated Border Glow */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-yellow-800 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        
        {/* Main Card */}
        <div className="relative bg-[#0a0a0c] border border-white/10 p-10 rounded-[2.5rem] shadow-2xl backdrop-blur-xl">
          
          <div className="text-center mb-10">
            <div className="inline-block px-4 py-1.5 mb-4 rounded-full border border-yellow-500/20 bg-yellow-500/5">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-yellow-500">Secure Protocol</span>
            </div>
            <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter leading-none">
              Admin <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Access</span>
            </h2>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Administrative ID</label>
              <input 
                type="email" 
                placeholder="admin@system.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/5 p-4 rounded-2xl text-white outline-none focus:border-yellow-500/50 focus:bg-white/[0.05] transition-all duration-300"
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Authorization Key</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/5 p-4 rounded-2xl text-white outline-none focus:border-yellow-500/50 focus:bg-white/[0.05] transition-all duration-300"
                required
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
                <p className="text-red-500 text-[11px] text-center font-bold uppercase tracking-wider">{error}</p>
              </div>
            )}
            
            <button 
              type="submit" 
              disabled={isLoading}
              className="group relative mt-4 overflow-hidden bg-yellow-500 py-4 rounded-2xl text-black font-black uppercase tracking-[0.2em] text-xs hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] transition-all duration-500 disabled:opacity-50"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? "Authenticating..." : "Authorize Login"}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            </button>

          </form>

          <p className="mt-8 text-center text-zinc-600 text-[9px] font-bold uppercase tracking-[0.2em]">
            Restricted Entry • System Monitoring Active
          </p>

        </div>
      </div>

      {/* Global Shimmer Animation for Tailwind */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}