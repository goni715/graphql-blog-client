import React, { useState } from "react";
import { usePosts } from "../context/PostContext";
import type { Post } from "../context/PostContext";
import { useAuth } from "../context/AuthContext";
import {
  Search,
  Calendar,
  User,
  Plus,
  Send,
  X,
  FileText,
  CheckCircle,
  FilePlus,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import type { IPost } from "../types/post.type";

const BlogsPage: React.FC = () => {
  const { posts, addPost, togglePublish } = usePosts();
  const { currentUser } = useAuth();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "published" | "drafts">(
    "all",
  );

  // Detailed view state
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // Create post modal state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const formatDate = (timestampStr: string) => {
    try {
      const ts = parseInt(timestampStr);
      if (!isNaN(ts)) {
        return new Date(ts).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      }
    } catch (e) {}
    return "June 17, 2026";
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !newTitle.trim() || !newContent.trim()) return;

    addPost(newTitle.trim(), newContent.trim(), {
      id: currentUser.id,
      name: currentUser.name,
      email: currentUser.email,
    });

    setNewTitle("");
    setNewContent("");
    setIsCreateOpen(false);
  };


  // Featured post is typically the first published post
  const featuredPost = posts.find((p) => p.published);



  const GET_ALL_POSTS = gql`
    query POSTS_DATA {
      posts {
        id
        title
        content
        published
        createdAt
        author {
          id
          name
          email
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_ALL_POSTS);
  const postsArr: IPost[] = (data as any)?.posts || [];

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
            {currentUser ? (
              <button
                onClick={() => setIsCreateOpen(true)}
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
        {/* Search and Filters Bar */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-900 pb-8 mb-12">
          {/* Search Box */}
          <div className="relative max-w-md w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
              <Search className="h-4 w-4 text-slate-500" />
            </div>
            <input
              type="text"
              placeholder="Search by title, content, or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full rounded-xl border border-slate-800 bg-slate-900/40 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/25 transition-all duration-200"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800/80">
            <button
              onClick={() => setFilterType("all")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                filterType === "all"
                  ? "bg-slate-800 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              All Articles
            </button>
            <button
              onClick={() => setFilterType("published")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                filterType === "published"
                  ? "bg-slate-800 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Published
            </button>
            {currentUser && (
              <button
                onClick={() => setFilterType("drafts")}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  filterType === "drafts"
                    ? "bg-slate-800 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                My Drafts
              </button>
            )}
          </div>
        </div>

        {/* Featured Post Card (only displayed when no active search) */}
        {!searchQuery && featuredPost && filterType !== "drafts" && (
          <div className="mb-16">
            <h2 className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-4">
              Featured Article
            </h2>
            <div className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 rounded-2xl border border-slate-800/70 bg-linear-to-b from-slate-900/50 to-slate-950/50 p-6 sm:p-8 backdrop-blur-md overflow-hidden hover:border-indigo-500/30 transition-all duration-300 shadow-xl">
              {/* Card visual gradient */}
              <div className="absolute right-0 top-0 w-100 h-75 bg-linear-to-tr from-indigo-500/5 to-purple-500/5 blur-[50px] pointer-events-none group-hover:scale-110 transition-transform duration-500"></div>

              {/* Text Info */}
              <div className="lg:col-span-8 flex flex-col justify-between">
                <div>
                  {/* Metadata */}
                  <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-indigo-400" />
                      {formatDate(featuredPost.createdAt)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-indigo-400" />
                      {featuredPost.author.name}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-indigo-300 transition-colors">
                    {featuredPost.title}
                  </h3>

                  {/* Snippet */}
                  <p className="text-slate-400 leading-relaxed text-sm sm:text-base line-clamp-3 mb-6">
                    {featuredPost.content}
                  </p>
                </div>

                {/* Author footer */}
                <div className="flex items-center justify-between border-t border-slate-900 pt-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-tr from-indigo-500 to-purple-500 text-white font-bold text-sm">
                      {featuredPost.author.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {featuredPost.author.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {featuredPost.author.email}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedPost(featuredPost)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-indigo-400 hover:text-indigo-300 bg-indigo-500/5 border border-indigo-500/10 hover:bg-indigo-500/10 transition-all duration-300"
                  >
                    <span>Read Article</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Graphic/Metadata right side */}
              <div className="lg:col-span-4 flex flex-col justify-center items-center bg-slate-950/40 rounded-xl border border-slate-800/40 p-6 text-center">
                <div className="h-12 w-12 rounded-full bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-indigo-400" />
                </div>
                <h4 className="text-white font-semibold text-sm">
                  GraphQL Object Schema
                </h4>
                <div className="mt-3 text-left w-full bg-slate-950/80 rounded-lg p-3 border border-slate-900 font-mono text-[10px] text-indigo-300 overflow-x-auto select-all">
                  <pre>
                    {JSON.stringify(
                      {
                        id: featuredPost.id,
                        title: featuredPost.title,
                        published: featuredPost.published,
                        createdAt: featuredPost.createdAt,
                        author: {
                          id: featuredPost.author.id,
                          name: featuredPost.author.name,
                          email: featuredPost.author.email,
                        },
                      },
                      null,
                      2,
                    )}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular Posts Grid */}
        <div>
          <h2 className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-6">
            {searchQuery ? "Search Results" : "All Articles"}
          </h2>

          {postsArr.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-slate-800 rounded-2xl">
              <p className="text-slate-400 mb-2">
                No posts found matching your filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setFilterType("all");
                }}
                className="text-indigo-400 hover:text-indigo-300 text-sm font-semibold underline underline-offset-4"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {postsArr.map((post) => (
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
                      {currentUser && currentUser.id === post.author.id && (
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
                      )}
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
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Reader Modal */}
      {selectedPost && (
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
                Post ID: {selectedPost.id} | JSON Published:{" "}
                {selectedPost.published ? "true" : "false"}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Post Modal */}
      {isCreateOpen && currentUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsCreateOpen(false)}
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
                  {currentUser.name}
                </span>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-md transition-all duration-300"
              >
                <Send className="h-4 w-4" />
                <span>Publish Post</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogsPage;
