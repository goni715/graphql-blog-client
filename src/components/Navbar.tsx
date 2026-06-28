import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BookOpen, LogIn, UserPlus, LogOut, Menu, X } from "lucide-react";
import { getEmail, getName, getToken, logout } from "../helper/SessionHelper";

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const name = getName();
  const token = getToken();
  const email = getEmail();

  const isActive = (path: string) => location.pathname === path;

  const linkClass = (path: string) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
      isActive(path)
        ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.15)]"
        : "text-slate-300 hover:text-white hover:bg-slate-800/50"
    }`;

  const mobileLinkClass = (path: string) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
      isActive(path)
        ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
        : "text-slate-300 hover:text-white hover:bg-slate-800/50"
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-lg group-hover:scale-105 transition-transform duration-300">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950">
                <BookOpen className="h-5 w-5 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
              </div>
            </div>
            <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-xl font-bold tracking-tight text-transparent">
              GraphQL
              <span className="text-slate-300 font-medium text-sm ml-1 select-none">
                Client
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/" className={linkClass("/")}>
              <span>Posts</span>
            </Link>

            {token && (
              <Link to="/myposts" className={linkClass("/myposts")}>
                <span>My Posts</span>
              </Link>
            )}

            {token && name ? (
              <div className="flex items-center gap-4 pl-4 border-l border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-tr from-indigo-500 to-purple-500 text-white text-xs font-bold shadow-md">
                    {name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-semibold text-slate-200">
                    {name}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all duration-300"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2.5 pl-4 border-l border-slate-800">
                <Link to="/login" className={linkClass("/login")}>
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-md shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:scale-[1.02] active:scale-95 transition-all duration-300"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-400 hover:bg-slate-800/80 hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-lg px-2 pt-2 pb-4 space-y-1.5 animate-fadeIn">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className={mobileLinkClass("/")}
          >
            <span>Posts</span>
          </Link>

          {token && (
            <Link
              to="/myposts"
              onClick={() => setIsMobileMenuOpen(false)}
              className={mobileLinkClass("/myposts")}
            >
              <span>My Posts</span>
            </Link>
          )}

          {token && name ? (
            <div className="pt-4 border-t border-slate-800/60 mt-4 space-y-3">
              <div className="flex items-center gap-3 px-4 py-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-tr from-indigo-500 to-purple-500 text-white text-sm font-bold">
                  {name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{name}</div>
                  <div className="text-xs text-slate-400">{email}</div>
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-slate-800/60 mt-4 space-y-2">
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className={mobileLinkClass("/login")}
              >
                <LogIn className="h-5 w-5" />
                <span>Login</span>
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg text-sm font-medium text-white bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300"
              >
                <UserPlus className="h-5 w-5" />
                <span>Register</span>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
