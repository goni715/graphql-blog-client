import { Calendar, ExternalLink } from "lucide-react";

const BlogCardSkeleton = () => {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-slate-900 bg-slate-900/20 p-6 animate-pulse select-none">
      <div>
        {/* Date block placeholder */}
        <div className="flex items-center justify-between mb-4">
          <span className="flex items-center gap-1.5 text-[11px] text-slate-800">
            <Calendar className="h-3 w-3 text-slate-800" />
            <span className="h-3.5 w-20 bg-slate-800/60 rounded" />
          </span>
        </div>

        {/* Title placeholder */}
        <div className="space-y-2 mb-4">
          <div className="h-5 w-5/6 bg-slate-800/80 rounded" />
          <div className="h-5 w-1/2 bg-slate-800/80 rounded" />
        </div>

        {/* Content placeholder */}
        <div className="space-y-2 mb-6">
          <div className="h-3.5 w-full bg-slate-800/50 rounded" />
          <div className="h-3.5 w-[92%] bg-slate-800/50 rounded" />
          <div className="h-3.5 w-4/5 bg-slate-800/45 rounded" />
        </div>
      </div>

      {/* Footer placeholder */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-900/80">
        <div className="flex items-center gap-2">
          {/* Avatar circle */}
          <div className="h-7 w-7 rounded-full bg-slate-800 border border-slate-700/60" />
          {/* Author name */}
          <div className="h-3.5 w-16 bg-slate-800/60 rounded" />
        </div>

        {/* Action Link */}
        <span className="text-xs text-slate-800 flex items-center gap-1">
          <span className="h-3.5 w-8 bg-slate-800/60 rounded" />
          <ExternalLink className="h-3 w-3 text-slate-800" />
        </span>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
