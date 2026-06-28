import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Globe,
  HelpCircle,
  Loader2,
  Pencil,
  Trash2,
} from "lucide-react";
import formatDate from "../../utils/formatDate";
import type { IPost } from "../../types/post.type";
import { useState } from "react";
import ViewPostModal from "../modal/ViewPostModal";
import DeletePostModal from "../modal/DeletePostModal";
import EditPostModal from "../modal/EditPostModal";
import { useMutation } from "@apollo/client/react";
import { PUBLISH_POST } from "../../Mutation/post.mutation";
import { GET_ALL_POSTS, GET_MY_POSTS } from "../../Query/post.query";
import { ErrorToast, SuccessToast } from "../../helper/ValidationHelper";

type TProps = {
  post: IPost;
};

const MyPostCard = ({ post }: TProps) => {
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const [deleteTargetPost, setDeleteTargetPost] = useState<IPost | null>(null);
  const [editTargetPost, setEditTargetPost] = useState<IPost | null>(null);

  const [publishPost, { loading }] = useMutation(PUBLISH_POST, {
    refetchQueries: [{ query: GET_MY_POSTS }, { query: GET_ALL_POSTS }],
  });

  const handlePublish = async (postId: string) => {
    try {
      const res = await publishPost({
        variables: { postId },
      });

      const userError = (res.data as any)?.publishPost?.userError;
      if (userError) {
        ErrorToast(userError);
      } else {
        SuccessToast("Post published successfully.");
      }
    } catch (err: any) {
      ErrorToast(err?.message || "Failed to publish post");
    }
  };

  return (
    <>
      <article
        key={post.id}
        className="flex flex-col justify-between rounded-xl border border-slate-900 bg-slate-900/20 p-6 hover:border-slate-800/80 hover:bg-slate-900/30 transition-all duration-300 relative group"
      >
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <Calendar className="h-3 w-3" />
              {formatDate(post.createdAt)}
            </span>

            {/* Status Badge */}
            {post.published ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold tracking-wide">
                <CheckCircle2 className="h-2.5 w-2.5" />
                <span>Published</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-[10px] font-semibold tracking-wide">
                <HelpCircle className="h-2.5 w-2.5" />
                <span>Draft</span>
              </span>
            )}
          </div>

          <h3 className="text-lg font-bold text-white mb-2.5 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm line-clamp-3 mb-6 leading-relaxed">
            {post.content}
          </p>
        </div>

        {/* Card Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-900 mt-auto">
          {/* Left: View Detail */}
          <button
            onClick={() => setSelectedPost(post)}
            className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer font-medium transition-colors"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>View Detail</span>
          </button>

          {/* Right: Actions row */}
          <div className="flex items-center gap-2">
            {/* Edit Button */}
            <button
              onClick={() => setEditTargetPost(post)}
              title="Edit post"
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-300 border border-slate-800 bg-slate-800/50 hover:bg-slate-700/60 hover:text-white hover:border-slate-700 transition-all cursor-pointer"
            >
              <Pencil className="h-3 w-3" />
              <span>Edit</span>
            </button>

            {/* Delete Button */}
            <button
              onClick={() => setDeleteTargetPost(post)}
              title="Delete post"
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-red-400 border border-red-500/20 bg-red-500/5 hover:bg-red-500/15 hover:border-red-500/40 hover:text-red-300 transition-all cursor-pointer"
            >
              <Trash2 className="h-3 w-3" />
              <span>Delete</span>
            </button>

            {/* Publish Button (draft only) */}
            {!post.published && (
              <button
                onClick={() => handlePublish(post.id)}
                disabled={loading}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 cursor-pointer disabled:cursor-not-allowed transition-all shadow-md"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-3 w-3 animate-spin" />
                    <span>Publishing...</span>
                  </>
                ) : (
                  <>
                    <Globe className="h-3 w-3" />
                    <span>Publish</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </article>

      {/* View Detail Modal */}
      {selectedPost && (
        <ViewPostModal
          selectedPost={selectedPost}
          setSelectedPost={setSelectedPost}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteTargetPost && (
        <DeletePostModal
          post={deleteTargetPost}
          onClose={() => setDeleteTargetPost(null)}
        />
      )}

      {/* Edit Post Modal */}
      {editTargetPost && (
        <EditPostModal
          post={editTargetPost}
          onClose={() => setEditTargetPost(null)}
        />
      )}
    </>
  );
};

export default MyPostCard;
