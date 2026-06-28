import { useQuery } from "@apollo/client/react";
import { AlertCircle } from "lucide-react";
import { GET_MY_POSTS } from "../Query/post.query";
import BlogCardSkeleton from "../components/blog/BlogCardSkeleton";
import type { IPost } from "../types/post.type";
import MyPostCard from "../components/blog/MyPostCard";
import StasCard from "../components/blog/StasCard";

const MyPostsPage = () => {
  const { loading, error, data } = useQuery(GET_MY_POSTS);
  const { name, email } = (data as any)?.me?.user || {};
  const rawPosts: IPost[] = (data as any)?.me?.user?.posts || [];
  // Sort posts by createdAt
  const posts = [...rawPosts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const totalPosts = posts.length;
  const publishedCount = posts.filter((p) => p.published).length;
  const draftCount = totalPosts - publishedCount;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 pb-16">
      {/* Dashboard Header & Profile */}
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
                Manage your written articles, view publication statuses, and
                release draft posts to the public.
              </p>
            </div>

            {/* Author Profile Card */}
            <div className="flex items-center gap-4 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 sm:p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-tr from-indigo-500 to-purple-500 text-white font-bold text-lg shadow-lg">
                {name ? name.charAt(0).toUpperCase() : "A"}
              </div>
              <div>
                <div className="font-semibold text-white text-base">
                  {name || "Author"}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">{email}</div>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <StasCard
            totalPosts={totalPosts}
            publishedCount={publishedCount}
            draftCount={draftCount}
          />
        </div>
      </div>

      {/* Posts List Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
        {error ? (
          <div className="mx-auto max-w-2xl text-center py-12 px-6 border border-red-500/20 bg-red-500/5 rounded-2xl">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-400 mb-4">
              <AlertCircle className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Failed to load publication data
            </h3>
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
            <p className="text-slate-400 text-sm mb-4">
              You have not written any articles yet.
            </p>
            <p className="text-xs text-slate-500">
              Go back to the homepage and write a post to start building your
              blog feed!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <MyPostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPostsPage;
