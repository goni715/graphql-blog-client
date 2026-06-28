import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client/react";
import { Calendar, CheckCircle2, Globe, HelpCircle, Loader2, BookOpen, AlertCircle } from "lucide-react";
import { getToken, getEmail, getName } from "../helper/SessionHelper";
import { GET_MY_POSTS, GET_ALL_POSTS } from "../Query/post.query";
import { PUBLISH_POST } from "../Mutation/post.mutation";
import { SuccessToast, ErrorToast } from "../helper/ValidationHelper";
import BlogCardSkeleton from "../components/blog/BlogCardSkeleton";
import ViewPostModal from "../components/modal/ViewPostModal";
import formatDate from "../utils/formatDate";
import type { IPost } from "../types/post.type";

const MyPostsPage = () => {
  const token = getToken();
  const email = getEmail();
  const name = getName();
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  // If no token, redirect to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const { loading, error, data } = useQuery(GET_MY_POSTS);

  const [publishPost] = useMutation(PUBLISH_POST, {
    refetchQueries: [{ query: GET_MY_POSTS }, { query: GET_ALL_POSTS }],
  });

  const handlePublish = async (postId: string) => {
    setActionLoadingId(postId);
    try {
      const res = await publishPost({
        variables: { postId },
      });

      const userError = res.data?.publishPost?.userError;
      if (userError) {
        ErrorToast(userError);
      } else {
        SuccessToast("Post published successfully.");
      }
    } catch (err: any) {
      ErrorToast(err?.message || "Failed to publish post");
    } finally {
      setActionLoadingId(null);
    }
  };

  const rawPosts: IPost[] = data?.me?.user?.posts || [];
  // Sort posts by newest created first
  const posts = [...rawPosts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const totalPosts = posts.length;
  const publishedCount = posts.filter((p) => p.published).length;
  const draftCount = totalPosts - publishedCount;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 pb-16">
      {/* Dashboard Header & Profile Section */}
      <div className="relative overflow-hidden border-b border-slate-900 bg-slate-950 py-12">
        <div className="absolute top-0 left-1/4 h-80 w-80 -translate-y-1/2 rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 h-80 w-80 translate-y-1/2 rounded-full bg-purple-500/5 blur-[100px] pointer-events-none"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
                My Publications
              </h1>
              <p className="mt-2 text-slate-400 text-sm">
                Manage your written articles, view publication statuses, and release draft posts to the public.
              </p>
            </div>

            {/* Author Profile Card */}
            <div className="flex items-center gap-4 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 sm:p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-tr from-indigo-500 to-purple-500 text-white font-bold text-lg shadow-lg">
                {name ? name.charAt(0).toUpperCase() : "A"}
              </div>
              <div>
                <div className="font-semibold text-white text-base">{name || "Author"}</div>
                <div className="text-xs text-slate-400 mt-0.5">{email}</div>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-4 mt-8 max-w-2xl">
            <div className="bg-slate-900/20 border border-slate-900 rounded-xl p-4 text-center">
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Total</div>
              <div className="text-2xl font-bold text-white mt-1">{totalPosts}</div>
            </div>
            <div className="bg-slate-900/20 border border-slate-900 rounded-xl p-4 text-center">
              <div className="text-xs text-emerald-500/80 font-semibold uppercase tracking-wider">Published</div>
              <div className="text-2xl font-bold text-emerald-400 mt-1">{publishedCount}</div>
            </div>
            <div className="bg-slate-900/20 border border-slate-900 rounded-xl p-4 text-center">
              <div className="text-xs text-amber-500/80 font-semibold uppercase tracking-wider">Drafts</div>
              <div className="text-2xl font-bold text-amber-400 mt-1">{draftCount}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts List Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
        {error ? (
          <div className="mx-auto max-w-2xl text-center py-12 px-6 border border-red-500/20 bg-red-500/5 rounded-2xl">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-400 mb-4">
              <AlertCircle className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Failed to load publication data</h3>
            <p className="text-sm text-red-400/80 mb-6">{error.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:border-slate-700 transition-all"
            >
              Retry Connection
            </button>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <BlogCardSkeleton key={index} />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-slate-800 rounded-2xl bg-slate-900/5">
            <p className="text-slate-400 text-sm mb-4">You have not written any articles yet.</p>
            <p className="text-xs text-slate-500">Go back to the homepage and write a post to start building your blog feed!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
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
                      disabled={actionLoadingId === post.id}
                      className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-white bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 cursor-pointer disabled:cursor-not-allowed transition-all shadow-md"
                    >
                      {actionLoadingId === post.id ? (
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
            ))}
          </div>
        )}
      </div>

      {/* Modal to view full post detail */}
      {selectedPost && (
        <ViewPostModal
          selectedPost={selectedPost}
          setSelectedPost={setSelectedPost}
        />
      )}
    </div>
  );
};

export default MyPostsPage;
