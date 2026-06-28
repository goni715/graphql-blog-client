import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Globe,
  HelpCircle,
  Loader2,
} from "lucide-react";
import formatDate from "../../utils/formatDate";
import type { IPost } from "../../types/post.type";
import { useState } from "react";
import ViewPostModal from "../modal/ViewPostModal";
import { useMutation } from "@apollo/client/react";
import { PUBLISH_POST } from "../../Mutation/post.mutation";
import { GET_ALL_POSTS, GET_MY_POSTS } from "../../Query/post.query";
import { ErrorToast, SuccessToast } from "../../helper/ValidationHelper";

type TProps = {
  post: IPost;
};

const MyPostCard = ({ post }: TProps) => {
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
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

        <div className="flex items-center justify-between pt-4 border-t border-slate-900 mt-auto">
          <button
            onClick={() => setSelectedPost(post)}
            className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer font-medium"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>View Detail</span>
          </button>

          {/* Publish Button */}
          {!post.published && (
            <button
              onClick={() => handlePublish(post.id)}
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-white bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 cursor-pointer disabled:cursor-not-allowed transition-all shadow-md"
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

export default MyPostCard;
