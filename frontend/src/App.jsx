import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Existing Pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));

// New Auth & Admin Pages
const Login = lazy(() => import("./pages/Login"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

// --- Protected Route Component ---
// Ye check karega ki token hai ya nahi
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== "admin") {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#050505] text-white selection:bg-yellow-500/30 selection:text-yellow-500">
        
        {/* Navbar */}
        <header className="sticky top-0 z-[100]">
           <Navbar />
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          <Suspense
            fallback={
              <div className="flex flex-col justify-center items-center h-[80vh] space-y-4">
                <div className="w-12 h-12 border-4 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin"></div>
                <p className="text-sm font-bold tracking-widest text-yellow-500 animate-pulse uppercase">
                  Initializing...
                </p>
              </div>
            }
          >
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />

              {/* Admin Protected Routes */}
              <Route 
                path="/admin/messages" 
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />

              {/* 404 Redirect */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Suspense>
        </main>

        {/* Footer */}
        <Footer />

      </div>
    </BrowserRouter>
  );
}