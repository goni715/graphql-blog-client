import React, { createContext, useContext, useState, useEffect } from "react";

export interface Post {
  id: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
}

interface PostContextType {
  posts: Post[];
  addPost: (title: string, content: string, author: { id: string; name: string; email: string }) => void;
  togglePublish: (id: string) => void;
  deletePost: (id: string) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

// Initial dummy posts data matching the user's requested JSON fields
const DUMMY_POSTS: Post[] = [
  {
    id: "8",
    title: "Title 04",
    content: "Content 04: A deep dive into modern frontend architectures and why GraphQL changes the way client applications fetch data. With the power of type safety and declarative queries, GraphQL makes it easier to model your components directly after the data they require, avoiding over-fetching and boosting developer velocity.",
    published: true,
    createdAt: "1782025288094", // 2026-06-17
    author: {
      id: "12",
      name: "Manik Islam",
      email: "manik@gmail.com",
    },
  },
  {
    id: "7",
    title: "Understanding GraphQL Schema & Resolvers",
    content: "GraphQL schemas act as a strict contract between the client and the server. Resolvers are the database-facing functions that resolve each field in the query. Together, they create a robust, self-documenting API that speeds up deployment cycles and simplifies system maintenance.",
    published: true,
    createdAt: "1781846400000", // 2026-06-15
    author: {
      id: "15",
      name: "Sarah Connor",
      email: "sarah@example.com",
    },
  },
  {
    id: "6",
    title: "React 19 & Tailwind CSS v4: The Developer Experience Upgrade",
    content: "With React 19 introducing native async transitions and Tailwind CSS v4 moving to an ultra-fast Rust engine with zero-config builds, the modern web developer ecosystem is experiencing an unprecedented speed boost. This post covers the design optimizations and configuration updates required to get your new project up and running in minutes.",
    published: true,
    createdAt: "1781673600000", // 2026-06-13
    author: {
      id: "20",
      name: "John Doe",
      email: "john@example.com",
    },
  },
  {
    id: "5",
    title: "Designing Interactive Glassmorphism UIs",
    content: "Glassmorphism remains one of the most premium design patterns in modern web design. By combining backdrop filters, translucent backgrounds, and fine borders, we can achieve high-fidelity user experiences that respond to light and depth, giving a clean, elegant desktop look.",
    published: false,
    createdAt: "1781500800000", // 2026-06-11
    author: {
      id: "12",
      name: "Manik Islam",
      email: "manik@gmail.com",
    },
  },
];

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem("blog_posts");
    return saved ? JSON.parse(saved) : DUMMY_POSTS;
  });

  useEffect(() => {
    localStorage.setItem("blog_posts", JSON.stringify(posts));
  }, [posts]);

  const addPost = (title: string, content: string, author: { id: string; name: string; email: string }) => {
    const newPost: Post = {
      id: Math.floor(Math.random() * 1000).toString(),
      title,
      content,
      published: true,
      createdAt: Date.now().toString(),
      author,
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  const togglePublish = (id: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, published: !post.published } : post
      )
    );
  };

  const deletePost = (id: string) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  return (
    <PostContext.Provider value={{ posts, addPost, togglePublish, deletePost }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePosts must be used within a PostProvider");
  }
  return context;
};
