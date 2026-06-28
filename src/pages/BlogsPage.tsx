import { useState } from "react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import type { IPost } from "../types/post.type";
import { GET_ALL_POSTS } from "../Query/post.query";
import { getToken } from "../helper/SessionHelper";
import CreatePostModal from "../components/modal/CreatePostModal";
import BlogCard from "../components/blog/BlogCard";

const BlogsPage = () => {
  const token = getToken();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const { loading, error, data } = useQuery(GET_ALL_POSTS);
  const posts: IPost[] = (data as any)?.posts || [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 pb-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-slate-900 bg-slate-950 py-16 sm:py-24">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 h-125 w-125 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/3 right-1/4 h-125 w-125 rounded-full bg-purple-500/10 blur-[120px] pointer-events-none"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <span>GraphQL Client Blog Engine</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-white">
            Explore the latest in{" "}
            <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              GraphQL & React
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            A beautiful, reactive client workspace simulating API states, user
            credentials, and dynamic postings with full Tailwind styling.
          </p>

          {/* Action buttons */}
          <div className="mt-8 flex justify-center gap-4">
            {token ? (
              <button
                onClick={() => setCreateModalOpen(true)}
                className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-indigo-600/20"
              >
                <Plus className="h-5 w-5" />
                <span>Write a Post</span>
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:border-slate-700 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <Plus className="h-5 w-5 text-indigo-400" />
                <span>Login to Write Posts</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
        <div>
          {posts.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-slate-800 rounded-2xl">
              <p className="text-slate-400 mb-2">No posts found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Post Modal */}
      {createModalOpen && token && (
        <CreatePostModal setCreateModalOpen={setCreateModalOpen} />
      )}
    </div>
  );
};

export default BlogsPage;
