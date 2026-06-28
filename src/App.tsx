import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PostProvider } from "./context/PostContext";
import BlogsPage from "./pages/BlogsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <PostProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-slate-950">
            <Navbar />
            <main className="grow">
              <Routes>
                <Route path="/" element={<BlogsPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </PostProvider>
    </AuthProvider>
  );
};

export default App;
