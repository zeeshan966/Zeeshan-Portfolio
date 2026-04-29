import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [animate, setAnimate] = useState(false);
  const [editingMsg, setEditingMsg] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchMessages = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/messages/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setMessages(data);
        setTimeout(() => setAnimate(true), 100);
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error("Dashboard Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMessages(); }, [navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm("Bhai, pakka delete karna hai? Ye wapas nahi aayega! 💀")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/messages/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setMessages(messages.filter((m) => m._id !== id));
      }
    } catch (err) { console.error(err); }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/messages/update/${editingMsg._id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(editingMsg),
      });
      if (res.ok) {
        setEditingMsg(null);
        fetchMessages();
      }
    } catch (err) { console.error(err); }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505]">
        <div className="w-14 h-14 border-4 border-yellow-500/10 border-t-yellow-500 rounded-2xl animate-spin mb-6"></div>
        <p className="text-yellow-500 font-black uppercase tracking-[0.4em] text-[10px] animate-pulse">Decrypting Database...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] pt-28 pb-20 px-6 md:px-10 selection:bg-yellow-500/30">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          <div className="space-y-3 text-center md:text-left w-full md:w-auto">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="w-10 h-[2px] bg-yellow-500"></span>
              <p className="text-yellow-500 font-black tracking-[0.4em] text-[10px] uppercase">Control Center</p>
            </div>
            <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter text-white leading-[0.85]">
              Master <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Logs</span>
            </h1>
          </div>
          <button onClick={handleLogout} className="w-full md:w-auto px-8 py-4 bg-white text-black rounded-2xl font-black uppercase text-[11px] tracking-widest active:scale-95 shadow-xl">
            Logout Session
          </button>
        </div>

        {/* --- Messages Grid OR Empty State --- */}
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 bg-white/[0.02] border border-dashed border-white/10 rounded-[3rem] animate-pulse">
            <div className="w-20 h-20 mb-6 bg-yellow-500/10 rounded-full flex items-center justify-center border border-yellow-500/20">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
               </svg>
            </div>
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-2 text-center">Zero Logs Detected</h2>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.3em] text-center">System is currently clear. No incoming transmissions.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {messages.map((msg, index) => (
              <div 
                key={msg._id} 
                style={{ 
                  transitionDelay: `${index * 80}ms`,
                  opacity: animate ? 1 : 0,
                  transform: animate ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.98)'
                }}
                className="group relative bg-[#0a0a0c] border border-white/5 p-7 md:p-9 rounded-[2.5rem] transition-all duration-700 ease-out hover:border-yellow-500/20 shadow-2xl overflow-hidden"
              >
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center text-black font-black text-lg">
                        {msg.name[0].toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-white font-black uppercase text-base tracking-tighter">{msg.name}</h3>
                        <p className="text-zinc-600 text-[9px] font-bold tracking-widest uppercase">{msg.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button onClick={() => setEditingMsg(msg)} className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-zinc-400 hover:text-yellow-500 transition-all active:scale-90">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button onClick={() => handleDelete(msg._id)} className="p-2.5 bg-red-500/10 rounded-xl border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all active:scale-90">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="bg-white/[0.02] p-6 rounded-2xl border border-white/5 mb-6 flex-grow">
                    <p className="text-zinc-400 text-sm italic font-medium">"{msg.message}"</p>
                  </div>

                  <div className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">
                    Log Date: {new Date(msg.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- Edit Modal --- */}
      {editingMsg && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">
          <div className="bg-[#0f0f11] w-full max-w-lg p-8 rounded-[3rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <h2 className="text-2xl font-black uppercase italic mb-6 text-yellow-500">Modify Record</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input 
                className="w-full bg-white/5 p-4 rounded-xl outline-none border border-white/10 focus:border-yellow-500 text-white font-bold"
                value={editingMsg.name}
                onChange={(e) => setEditingMsg({...editingMsg, name: e.target.value})}
              />
              <textarea 
                className="w-full bg-white/5 p-4 rounded-xl outline-none border border-white/10 focus:border-yellow-500 text-white h-32 resize-none leading-relaxed"
                value={editingMsg.message}
                onChange={(e) => setEditingMsg({...editingMsg, message: e.target.value})}
              />
              <div className="flex gap-4 pt-4">
                <button type="submit" className="flex-1 bg-yellow-500 text-black py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest active:scale-95 transition-all">Update Core</button>
                <button type="button" onClick={() => setEditingMsg(null)} className="flex-1 bg-white/5 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest active:scale-95">Abort</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}