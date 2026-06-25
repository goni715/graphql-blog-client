import React from "react";
import { Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-900 bg-slate-950 py-6 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-center text-sm text-slate-500">
            &copy; {new Date().getFullYear()} GraphQL Blog Client. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-sm text-slate-500">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-rose-500 fill-rose-500 animate-pulse" />
            <span>using React 19 & Tailwind CSS v4</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
