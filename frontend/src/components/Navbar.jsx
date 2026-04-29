import { NavLink, useNavigate } from "react-router-dom";
import { useState, useCallback, useMemo } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Authentication check
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsOpen(false);
    navigate("/login");
  };

  const navLinks = useMemo(
    () => [
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
      { name: "Contact", path: "/contact" },
    ],
    []
  );

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 h-20 flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
        
        {/* --- Logo --- */}
        <NavLink to="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center text-black font-black text-xl shadow-[0_0_20px_rgba(234,179,8,0.3)] group-hover:rotate-12 transition-all duration-300">
            Z
          </div>
          <span className="text-xl font-black tracking-tighter text-white uppercase italic">
            Zeeshan<span className="text-yellow-500">.</span>Dev
          </span>
        </NavLink>

        {/* --- Desktop Navigation --- */}
        <div className="hidden md:flex items-center gap-3"> 
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300
                ${isActive 
                  ? "bg-yellow-500 text-black shadow-[0_8px_20px_rgba(234,179,8,0.3)] scale-105" 
                  : "text-gray-400 hover:bg-white/10 hover:text-white hover:-translate-y-1 active:scale-95 active:translate-y-0"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          
          <div className="w-[1px] h-6 bg-white/10 mx-2"></div>

          {/* --- Auth Buttons (Conditional) --- */}
          {token && role === "admin" ? (
            <div className="flex items-center gap-3">
              <NavLink 
                to="/admin/messages" 
                className={({ isActive }) =>
                  `px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300 border border-yellow-500/30
                  ${isActive ? "bg-yellow-500 text-black shadow-lg" : "text-yellow-500 hover:bg-yellow-500/10"}`
                }
              >
                Dashboard
              </NavLink>
              <button 
                onClick={handleLogout}
                className="px-6 py-2.5 bg-red-600/10 text-red-500 text-[11px] font-black uppercase rounded-xl border border-red-600/20 hover:bg-red-600 hover:text-white transition-all duration-300 active:scale-95"
              >
                Logout
              </button>
            </div>
          ) : (
            <NavLink 
              to="/login" 
              className="px-6 py-2.5 bg-white text-black text-[11px] font-black uppercase rounded-xl hover:bg-yellow-500 transition-all duration-300 active:scale-95 shadow-lg shadow-white/5"
            >
              Admin Login
            </NavLink>
          )}
        </div>

        {/* --- Mobile Menu Toggle --- */}
        <button onClick={toggleMenu} className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-yellow-500">
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>

      {/* --- Mobile Menu Dropdown --- */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-[#080808] border-b border-white/10 transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="flex flex-col p-8 gap-4 items-center">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `w-full text-center py-4 rounded-2xl font-black uppercase tracking-widest transition-all
                ${isActive ? "bg-yellow-500 text-black shadow-xl" : "bg-white/5 text-gray-400"}`
              }
            >
              {link.name}
            </NavLink>
          ))}
          
          <div className="w-full h-[1px] bg-white/5 my-2"></div>

          {token && role === "admin" ? (
            <>
              <NavLink 
                to="/admin/messages" 
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-4 rounded-2xl font-black uppercase tracking-widest bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
              >
                Dashboard
              </NavLink>
              <button 
                onClick={handleLogout}
                className="w-full text-center py-4 rounded-2xl font-black uppercase tracking-widest bg-red-600/10 text-red-500 border border-red-600/20"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink 
              to="/login" 
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-4 rounded-2xl font-black uppercase tracking-widest bg-white text-black"
            >
              Admin Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}  