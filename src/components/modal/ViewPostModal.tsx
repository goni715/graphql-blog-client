import { Calendar, User, X } from "lucide-react";
import React from "react";
import formatDate from "../../utils/formatDate";
import type { IPost } from "../../types/post.type";

type TProps = {
  selectedPost: IPost;
  setSelectedPost: React.Dispatch<React.SetStateAction<IPost | null>>;
};

const ViewPostModal = ({ selectedPost, setSelectedPost }: TProps) => {

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
        <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
          <button
            onClick={() => setSelectedPost(null)}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-3 text-xs text-slate-400 mb-4 mt-2">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-indigo-400" />
              {formatDate(selectedPost.createdAt)}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <User className="h-3.5 w-3.5 text-indigo-400" />
              Authored by {selectedPost.author.name}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            {selectedPost.title}
          </h3>

          <div className="text-slate-300 space-y-4 leading-relaxed text-sm sm:text-base border-t border-b border-slate-800 py-6 mb-6">
            {selectedPost.content.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-tr from-indigo-500 to-purple-500 text-white font-bold">
                {selectedPost.author.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="text-sm font-semibold text-white">
                  {selectedPost.author.name}
                </div>
                <div className="text-xs text-slate-500">
                  {selectedPost.author.email}
                </div>
              </div>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-[10px] text-indigo-400">
              Post ID: {selectedPost.id} | Published:{" "}
              {selectedPost.published ? "true" : "false"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewPostModal;
