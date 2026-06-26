import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {


  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-slate-950 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-40 -left-40 h-150 w-150 rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none"></div>
        <div className="absolute -bottom-40 -right-40 h-150 w-150 rounded-full bg-purple-600/10 blur-[120px] pointer-events-none"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back Link */}
        <Link
          to="/"
          className="group inline-flex items-center gap-2 mb-6 text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        {/* Card */}
        <div className="w-full rounded-2xl border border-slate-800/80 bg-slate-900/60 p-8 backdrop-blur-xl shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-white bg-linear-to-r from-indigo-200 via-slate-100 to-purple-200 bg-clip-text">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Sign in to manage your blog posts and write new content.
            </p>
          </div>

          <LoginForm/>
          {/* Tips for logging in */}
          <div className="mt-5 p-3 rounded-lg bg-indigo-500/5 border border-indigo-500/10 text-xs text-indigo-400 text-center">
            Tip: Log in with email <span className="font-semibold text-indigo-300">manik@gmail.com</span> and password <span className="font-semibold text-indigo-300">123456</span>
          </div>

          <div className="mt-8 text-center border-t border-slate-800/60 pt-6">
            <p className="text-sm text-slate-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-4"
              >
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;