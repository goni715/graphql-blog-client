import { Calendar, ExternalLink } from "lucide-react";
import formatDate from "../../utils/formatDate";
import type { IPost } from "../../types/post.type";
import { useState } from "react";
import ViewPostModal from "../modal/ViewPostModal";

type TProps = {
  post: IPost;
};

const BlogCard = ({ post }: TProps) => {
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  
  return (
    <>
      <article
        key={post.id}
        onClick={() => setSelectedPost(post)}
        className="group cursor-pointer flex flex-col justify-between rounded-xl border border-slate-900 bg-slate-900/20 p-6 hover:border-slate-800/80 hover:bg-slate-900/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      >
        <div>
          {/* Header: published state + date */}
          <div className="flex items-center justify-between mb-4">
            <span className="flex items-center gap-1 text-[11px] text-slate-500">
              <Calendar className="h-3 w-3" />
              {formatDate(post.createdAt)}
            </span>
            {/* {currentUser && currentUser.id === post.author.id && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePublish(post.id);
                }}
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold transition-all ${
                  post.published
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                }`}
              >
                {post.published ? "Published" : "Draft"}
              </button>
            )} */}
          </div>

          <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-indigo-300 transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm line-clamp-3 mb-6 leading-relaxed">
            {post.content}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-900">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-slate-300 font-bold text-xs border border-slate-700">
              {post.author.name.charAt(0).toUpperCase()}
            </div>
            <span className="text-xs font-semibold text-slate-300 truncate max-w-30">
              {post.author.name}
            </span>
          </div>

          <span className="text-xs text-indigo-400 group-hover:underline flex items-center gap-1">
            <span>View</span>
            <ExternalLink className="h-3 w-3" />
          </span>
        </div>
      </article>

      {selectedPost && (
        <ViewPostModal
          selectedPost={selectedPost}
          setSelectedPost={setSelectedPost}
        />
      )}
    </>
  );
};

export default BlogCard;
