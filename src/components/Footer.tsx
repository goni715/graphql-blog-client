import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-900 bg-slate-950 py-6 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <p className="text-center text-sm text-slate-500">
            &copy; {new Date().getFullYear()} GraphQL Blog Client. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
