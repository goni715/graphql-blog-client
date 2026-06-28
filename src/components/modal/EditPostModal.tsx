import { FileEdit, Loader2, Save, X } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { UPDATE_POST } from "../../Mutation/post.mutation";
import { GET_ALL_POSTS, GET_MY_POSTS } from "../../Query/post.query";
import { ErrorToast, SuccessToast } from "../../helper/ValidationHelper";
import type { IPost } from "../../types/post.type";

type TProps = {
  post: IPost;
  onClose: () => void;
};

const EditPostModal = ({ post, onClose }: TProps) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const [updatePost, { loading }] = useMutation(UPDATE_POST, {
    refetchQueries: [{ query: GET_MY_POSTS }, { query: GET_ALL_POSTS }],
  });

  const hasChanges =
    title.trim() !== post.title || content.trim() !== post.content;

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    try {
      const res = await updatePost({
        variables: {
          postId: post.id,
          post: { title: title.trim(), content: content.trim() },
        },
      });

      const userError = (res.data as any)?.updatePost?.userError;
      if (userError) {
        ErrorToast(userError);
      } else {
        SuccessToast("Post updated successfully.");
        onClose();
      }
    } catch (err: any) {
      ErrorToast("Something Went Wrong");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-950/85 backdrop-blur-sm animate-fadeIn"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl relative overflow-hidden max-h-[90vh] flex flex-col">
        {/* Indigo top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-indigo-600 via-purple-500 to-indigo-600" />

        {/* Header */}
        <div className="flex items-center gap-3 p-6 pb-5 border-b border-slate-800/70 shrink-0">
          <div className="relative">
            <div className="absolute inset-0 rounded-lg bg-indigo-500/20 blur-lg" />
            <div className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-indigo-500/30 bg-indigo-500/10">
              <FileEdit className="h-5 w-5 text-indigo-400" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-white leading-tight">
              Edit Post
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 truncate">
              Editing: <span className="text-slate-400">{post.title}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 text-slate-500 hover:text-white p-1.5 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleUpdate}
          className="flex flex-col flex-1 overflow-y-auto"
        >
          <div className="p-6 space-y-5">
            {/* Title Field */}
            <div>
              <label
                htmlFor="edit-post-title"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Title
              </label>
              <input
                id="edit-post-title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title..."
                className="block w-full rounded-xl border border-slate-800 bg-slate-950/80 py-3 px-4 text-sm text-white placeholder-slate-600 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all"
              />
            </div>

            {/* Content Field */}
            <div>
              <label
                htmlFor="edit-post-content"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Content
              </label>
              <textarea
                id="edit-post-content"
                required
                rows={8}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your article content here..."
                className="block w-full rounded-xl border border-slate-800 bg-slate-950/80 py-3 px-4 text-sm text-white placeholder-slate-600 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all resize-none"
              />
            </div>

            {/* Change indicator */}
            {hasChanges && (
              <div className="flex items-center gap-2 p-3 bg-amber-500/5 border border-amber-500/20 rounded-xl text-xs text-amber-400">
                <div className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
                <span>You have unsaved changes</span>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row gap-3 p-6 pt-4 border-t border-slate-800/70 shrink-0">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 rounded-xl border border-slate-800 bg-slate-800/50 py-2.5 px-4 text-sm font-semibold text-slate-300 hover:bg-slate-800 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !hasChanges}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl py-2.5 px-4 text-sm font-semibold text-white bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-900/30 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostModal;
