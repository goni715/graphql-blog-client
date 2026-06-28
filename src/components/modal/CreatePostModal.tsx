import { CheckCircle, FilePlus, Send, X } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { getName } from "../../helper/SessionHelper";

type TProps = {
  setCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreatePostModal = ({ setCreateModalOpen }: TProps) => {
  const name = getName();
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    // addPost(newTitle.trim(), newContent.trim(), {
    //   id: currentUser.id,
    //   name: currentUser.name,
    //   email: currentUser.email,
    // });

    setNewTitle("");
    setNewContent("");
    setCreateModalOpen(false);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
        <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl relative">
          <button
            onClick={() => setCreateModalOpen(false)}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <FilePlus className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold text-white">Write New Post</h3>
          </div>

          <form onSubmit={handleCreatePost} className="space-y-5">
            <div>
              <label
                htmlFor="post-title"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Title
              </label>
              <input
                id="post-title"
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Modern Caching techniques with GraphQL"
                className="block w-full rounded-xl border border-slate-800 bg-slate-950/80 py-3 px-4 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="post-content"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Content Body
              </label>
              <textarea
                id="post-content"
                required
                rows={6}
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Write your article markdown or plain content here..."
                className="block w-full rounded-xl border border-slate-800 bg-slate-950/80 py-3 px-4 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all resize-none"
              />
            </div>

            <div className="flex items-center gap-2 p-3 bg-indigo-500/5 border border-indigo-500/10 rounded-xl text-xs text-indigo-400">
              <CheckCircle className="h-4 w-4 shrink-0" />
              <span>
                Creating this post registers it under your current profile:{" "}
                {name}
              </span>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center cursor-pointer disabled:cursor-not-allowed gap-2 rounded-xl py-3 text-sm font-semibold text-white bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-md transition-all duration-300"
            >
              <Send className="h-4 w-4" />
              <span>Create Post</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePostModal;
