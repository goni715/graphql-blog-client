type TProps = {
  totalPosts: number;
  publishedCount: number;
  draftCount: number;
};

const StasCard = ({ totalPosts, publishedCount, draftCount }: TProps) => {
  return (
    <>
      <div className="grid grid-cols-3 gap-4 mt-8 max-w-2xl">
        <div className="bg-slate-900/20 border border-slate-900 rounded-xl p-4 text-center">
          <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
            Total
          </div>
          <div className="text-2xl font-bold text-white mt-1">{totalPosts}</div>
        </div>
        <div className="bg-slate-900/20 border border-slate-900 rounded-xl p-4 text-center">
          <div className="text-xs text-emerald-500/80 font-semibold uppercase tracking-wider">
            Published
          </div>
          <div className="text-2xl font-bold text-emerald-400 mt-1">
            {publishedCount}
          </div>
        </div>
        <div className="bg-slate-900/20 border border-slate-900 rounded-xl p-4 text-center">
          <div className="text-xs text-amber-500/80 font-semibold uppercase tracking-wider">
            Drafts
          </div>
          <div className="text-2xl font-bold text-amber-400 mt-1">
            {draftCount}
          </div>
        </div>
      </div>
    </>
  );
};

export default StasCard;
