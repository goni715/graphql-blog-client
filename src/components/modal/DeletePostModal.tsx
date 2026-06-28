import { AlertTriangle, Loader2, Trash2, X } from "lucide-react";
import { useMutation } from "@apollo/client/react";
import { DELETE_POST } from "../../Mutation/post.mutation";
import { GET_ALL_POSTS, GET_MY_POSTS } from "../../Query/post.query";
import { ErrorToast, SuccessToast } from "../../helper/ValidationHelper";
import type { IPost } from "../../types/post.type";

type TProps = {
  post: IPost;
  onClose: () => void;
};

const DeletePostModal = ({ post, onClose }: TProps) => {
  const [deletePost, { loading }] = useMutation(DELETE_POST, {
    refetchQueries: [{ query: GET_MY_POSTS }, { query: GET_ALL_POSTS }],
  });

  const handleDelete = async () => {
    try {
      const res = await deletePost({ variables: { postId: post.id } });
      const userError = (res.data as any)?.deletePost?.userError;
      if (userError) {
        ErrorToast(userError);
      } else {
        SuccessToast("Post deleted successfully.");
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
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl relative overflow-hidden">
        {/* Red top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-red-600 via-rose-500 to-red-600" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-white p-1.5 hover:bg-slate-800 rounded-lg transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Icon + Heading */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative mb-4">
              <div className="absolute inset-0 rounded-full bg-red-500/20 blur-xl scale-150" />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-red-500/30 bg-red-500/10">
                <Trash2 className="h-7 w-7 text-red-400" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Delete Post</h3>
            <p className="text-sm text-slate-400">This action cannot be undone.</p>
          </div>

          {/* Post Preview */}
          <div className="mb-6 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 shrink-0">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-slate-500 mb-1 font-medium uppercase tracking-wide">
                  Post to be deleted
                </p>
                <p className="text-sm font-semibold text-white truncate leading-snug">
                  {post.title}
                </p>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {post.content}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 rounded-xl border border-slate-800 bg-slate-800/50 py-2.5 px-4 text-sm font-semibold text-slate-300 hover:bg-slate-800 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl py-2.5 px-4 text-sm font-semibold text-white bg-linear-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed transition-all shadow-lg shadow-red-900/30 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Deleting...</span>
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  <span>Delete Post</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePostModal;
