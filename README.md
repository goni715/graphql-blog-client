# 📝 GraphQL Blog Client

A sleek, reactive blog platform built with **React 19 + TypeScript + Apollo Client v4 + Tailwind CSS v4**, powered by a **GraphQL API**. Users can browse published posts, register an account, sign in, write new posts, edit drafts, publish them, and delete posts — all through a beautifully styled dark-mode interface.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS v4 |
| GraphQL Client | Apollo Client v4 |
| Routing | React Router DOM v7 |
| Notifications | react-hot-toast |
| Icons | lucide-react |
| Linting | oxlint |

---

## 📁 Project File Structure

```
graphql-blog-client/
├── public/
├── src/
│   ├── App.tsx                        # Root app component — router + route definitions
│   ├── main.tsx                       # Entry point — Apollo Client setup, auth link, Toaster
│   ├── index.css                      # Tailwind CSS import (@import "tailwindcss")
│   │
│   ├── Mutation/                      # All GraphQL mutations (gql tagged documents)
│   │   ├── auth.mutation.ts           # REGISTER, LOGIN
│   │   └── post.mutation.ts           # CREATE_POST, PUBLISH_POST, DELETE_POST, UPDATE_POST
│   │
│   ├── Query/                         # All GraphQL queries (gql tagged documents)
│   │   └── post.query.ts              # GET_ALL_POSTS, GET_MY_POSTS
│   │
│   ├── types/                         # TypeScript interfaces
│   │   └── post.type.ts               # IPost interface
│   │
│   ├── helper/                        # Class-based singleton helpers
│   │   ├── SessionHelper.ts           # Token, name, email management via localStorage
│   │   └── ValidationHelper.ts        # SuccessToast & ErrorToast (react-hot-toast wrappers)
│   │
│   ├── utils/                         # Pure utility functions
│   │   └── formatDate.ts              # Unix timestamp string → "Month DD, YYYY"
│   │
│   ├── pages/                         # Top-level route pages
│   │   ├── BlogsPage.tsx              # Public feed — lists all published posts
│   │   ├── MyPostsPage.tsx            # Auth dashboard — user's own posts + stats
│   │   ├── LoginPage.tsx              # Login page layout wrapper
│   │   └── RegisterPage.tsx           # Register page layout wrapper
│   │
│   ├── components/                    # Reusable UI components
│   │   ├── Navbar.tsx                 # Sticky top nav, auth-aware, mobile-responsive
│   │   ├── Footer.tsx                 # Simple copyright footer
│   │   ├── LoginForm.tsx              # Login form with validation + LOGIN mutation
│   │   ├── RegisterForm.tsx           # Register form with validation + REGISTER mutation
│   │   │
│   │   ├── blog/                      # Blog-specific display components
│   │   │   ├── BlogCard.tsx           # Public post card (click-to-view)
│   │   │   ├── BlogCardSkeleton.tsx   # Animated pulse skeleton for loading states
│   │   │   ├── MyPostCard.tsx         # Author card: Edit / Delete / Publish / View
│   │   │   └── StasCard.tsx           # Stats bar: total / published / draft counts
│   │   │
│   │   └── modal/                     # Modal overlays (fixed, backdrop-blur)
│   │       ├── CreatePostModal.tsx    # New post form → CREATE_POST
│   │       ├── EditPostModal.tsx      # Edit post form → UPDATE_POST
│   │       ├── DeletePostModal.tsx    # Delete confirmation → DELETE_POST
│   │       └── ViewPostModal.tsx      # Full post reader (public + author)
│   │
│   └── assets/                        # Static assets
│
├── .env                               # Environment variables (VITE_API_BASE_URL)
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🛣️ Routes

| Path | Page Component | Access |
|---|---|---|
| `/` | `BlogsPage` | Public |
| `/myposts` | `MyPostsPage` | Authenticated only |
| `/login` | `LoginPage` | Public |
| `/register` | `RegisterPage` | Public |

---

## 🔗 GraphQL Mutations

### `src/Mutation/auth.mutation.ts`

#### `REGISTER`
Creates a new user account.

```graphql
mutation RegisterData($name: String!, $email: String!, $password: String!) {
  signup(name: $name, email: $email, password: $password) {
    userError
    name
    email
  }
}
```

| | |
|---|---|
| **Used in** | `RegisterForm.tsx` |
| **On success** | Navigates to `/login` with a success toast |
| **On failure** | Displays `userError` in an inline rose-colored alert |

---

#### `LOGIN`
Authenticates a user and returns a JWT token.

```graphql
mutation Login($email: String!, $password: String!) {
  signin(email: $email, password: $password) {
    userError
    token
  }
}
```

| | |
|---|---|
| **Used in** | `LoginForm.tsx` |
| **On success** | Stores `token` + `name` via `SessionHelper`, navigates to `/` |
| **On failure** | Displays `userError` in an inline rose-colored alert |

---

### `src/Mutation/post.mutation.ts`

#### `CREATE_POST`
Creates a new **draft** post for the authenticated user.

```graphql
mutation CreatePost($post: PostInput!) {
  addPost(post: $post) {
    userError
    post {
      title
      content
      published
    }
  }
}
```

| | |
|---|---|
| **Variables** | `{ post: { title: string, content: string } }` |
| **Used in** | `CreatePostModal.tsx` |
| **On success** | Success toast + modal closes |

---

#### `PUBLISH_POST`
Publishes a draft post (flips `published` → `true`).

```graphql
mutation PublishPost($postId: ID!) {
  publishPost(postId: $postId) {
    userError
    post {
      id
      title
      content
      published
    }
  }
}
```

| | |
|---|---|
| **Variables** | `{ postId: string }` |
| **Used in** | `MyPostCard.tsx` (inline button) |
| **Refetches** | `GET_MY_POSTS`, `GET_ALL_POSTS` |
| **Visibility** | Button only shown on **draft** posts |

---

#### `DELETE_POST`
Permanently deletes a post by ID.

```graphql
mutation DeletePost($postId: ID!) {
  deletePost(postId: $postId) {
    userError
    post {
      id
      title
      content
    }
  }
}
```

| | |
|---|---|
| **Variables** | `{ postId: string }` |
| **Used in** | `DeletePostModal.tsx` |
| **Refetches** | `GET_MY_POSTS`, `GET_ALL_POSTS` |
| **UX** | Confirmation modal previews post title + content before deletion |

---

#### `UPDATE_POST`
Updates the title and/or content of an existing post.

```graphql
mutation UpdatePost($postId: ID!, $post: PostInput) {
  updatePost(postId: $postId, post: $post) {
    userError
    post {
      title
      content
    }
  }
}
```

| | |
|---|---|
| **Variables** | `{ postId: string, post: { title: string, content: string } }` |
| **Used in** | `EditPostModal.tsx` |
| **Refetches** | `GET_MY_POSTS`, `GET_ALL_POSTS` |
| **UX** | Form pre-filled; Save disabled until actual changes are detected |

---

## 🔍 GraphQL Queries

### `src/Query/post.query.ts`

#### `GET_ALL_POSTS`
Fetches all published posts for the public blog feed.

```graphql
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
```

| | |
|---|---|
| **Used in** | `BlogsPage.tsx` |
| **Auth required** | No |
| **Refetched by** | `CREATE_POST`, `PUBLISH_POST`, `DELETE_POST`, `UPDATE_POST` |

---

#### `GET_MY_POSTS`
Fetches the authenticated user's profile and **all** their posts (published + drafts).

```graphql
query GET_MY_POSTS {
  me {
    userError
    user {
      id
      name
      email
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
  }
}
```

| | |
|---|---|
| **Used in** | `MyPostsPage.tsx` |
| **Auth required** | Yes — `Authorization` header with JWT token |
| **Refetched by** | `PUBLISH_POST`, `DELETE_POST`, `UPDATE_POST` |

---

## 🧩 TypeScript Types

### `src/types/post.type.ts`

```ts
export interface IPost {
  id: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;     // Unix timestamp in milliseconds as a string
  author: {
    id: string;
    name: string;
    email: string;
  };
}
```

**Used across:** `BlogCard`, `MyPostCard`, `ViewPostModal`, `EditPostModal`, `DeletePostModal`

---

## 🛠️ Helper Modules

### `src/helper/SessionHelper.ts`

A `SessionHelper` class exported as a singleton. Manages user session data in `localStorage`.

| Export | Signature | Description |
|---|---|---|
| `setToken` | `(token: string) => void` | Persists the JWT token |
| `getToken` | `() => string \| null` | Reads the JWT token (SSR-safe guard) |
| `setName` | `(name: string) => void` | Persists the user's display name |
| `getName` | `() => string \| null` | Reads the user's display name |
| `setEmail` | `(email: string) => void` | Persists the user's email |
| `getEmail` | `() => string \| null` | Reads the user's email |
| `logout` | `() => void` | Clears `localStorage` and redirects to `/login` |

**Used in:** `main.tsx` (Apollo auth link), `Navbar.tsx`, `LoginForm.tsx`, `BlogsPage.tsx`

---

### `src/helper/ValidationHelper.ts`

A `ValidationHelper` class exported as a singleton. Wraps `react-hot-toast` for consistent toast notifications.

| Export | Signature | Description |
|---|---|---|
| `SuccessToast` | `(msg: string) => void` | Fires a green success toast |
| `ErrorToast` | `(msg: string) => void` | Fires a red error toast |

**Used in:** All mutation handlers across forms and modal components.

---

## 🔧 Utility Functions

### `src/utils/formatDate.ts`

```ts
const formatDate = (timestampStr: string): string
```

Converts a Unix timestamp string (milliseconds) into a human-readable date string.

```ts
formatDate("1718572800000")  // → "June 17, 2026"
```

- Falls back to `"June 17, 2026"` on invalid/unparseable input
- Locale: `en-US` with `{ year: "numeric", month: "long", day: "numeric" }`
- **Used in:** `BlogCard.tsx`, `MyPostCard.tsx`, `ViewPostModal.tsx`

---

## ⚙️ Apollo Client Configuration (`main.tsx`)

Two `ApolloLink` stages are chained before the HTTP call:

1. **`authLink`** — Reads the JWT from `SessionHelper.getToken()` and injects it as the `Authorization` header on every outgoing operation.
2. **`httpLink`** — Points to the `VITE_API_BASE_URL` environment variable.

```ts
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
```

The root renders:
```tsx
<ApolloProvider client={client}>
  <Toaster position="top-right" />
  <App />
</ApolloProvider>
```

---

## 🗂️ Component Reference

### Pages

| Component | Purpose |
|---|---|
| `BlogsPage` | Public post feed. Fetches `GET_ALL_POSTS`. Renders `BlogCard` grid with `BlogCardSkeleton` during load. Authenticated users see a **Write a Post** button that opens `CreatePostModal`. |
| `MyPostsPage` | Author dashboard. Fetches `GET_MY_POSTS`. Posts sorted newest-first. Displays `StasCard` stats + `MyPostCard` grid. |
| `LoginPage` | Full-page wrapper that centers the `LoginForm` card. |
| `RegisterPage` | Full-page wrapper that centers the `RegisterForm` card. |

---

### Layout

| Component | Purpose |
|---|---|
| `Navbar` | Sticky top navbar. Auth-aware: shows Posts, My Posts, user avatar/name + Logout when logged in; Login + Register otherwise. Syncs auth state on every route change. Responsive hamburger menu on mobile with `animate-fadeIn`. |
| `Footer` | Minimal footer with copyright year, always rendered below all pages. |

---

### Blog Components (`src/components/blog/`)

| Component | Props | Purpose |
|---|---|---|
| `BlogCard` | `post: IPost` | Clickable public post card. Opens `ViewPostModal`. Hover lift + color transition. |
| `BlogCardSkeleton` | — | Animated `animate-pulse` skeleton that mirrors `BlogCard` layout exactly. |
| `MyPostCard` | `post: IPost` | Author card with Published/Draft badge + action buttons: **View Detail**, **Edit**, **Delete**, **Publish** (draft only). |
| `StasCard` | `totalPosts: number`, `publishedCount: number`, `draftCount: number` | Three-column stats bar at the top of `MyPostsPage`. |

---

### Modals (`src/components/modal/`)

| Component | Props | GraphQL | Purpose |
|---|---|---|---|
| `CreatePostModal` | `setCreateModalOpen: Dispatch` | `CREATE_POST` | New post form. Title + content fields. |
| `EditPostModal` | `post: IPost`, `onClose: () => void` | `UPDATE_POST` | Pre-filled edit form. Amber unsaved-changes indicator. Save disabled when no changes. |
| `DeletePostModal` | `post: IPost`, `onClose: () => void` | `DELETE_POST` | Red danger confirmation. Shows post title + content preview. |
| `ViewPostModal` | `selectedPost: IPost`, `setSelectedPost: Dispatch` | — | Full read modal. Author info, post ID, publish status. Backdrop-click to close. |

---

## 🌍 Environment Variables

Create `.env` in the `src/` directory:

```env
VITE_API_BASE_URL=https://your-graphql-api.com/graphql
```

| Variable | Required | Description |
|---|---|---|
| `VITE_API_BASE_URL` | ✅ Yes | Full URL of the GraphQL API endpoint |

> **Note:** All client-side Vite env variables must be prefixed with `VITE_`.

---

## 🏁 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm or yarn
- A running GraphQL API backend

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/graphql-blog-client.git
cd graphql-blog-client

# 2. Install dependencies
npm install

# 3. Configure environment
echo "VITE_API_BASE_URL=http://localhost:4000/graphql" > src/.env

# 4. Start the development server
npm run dev
```

App runs at **`http://localhost:5173`**

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite HMR development server |
| `npm run build` | Type-check + produce production bundle |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run oxlint across the source tree |

---

## 🔐 Authentication Flow

```
Register
  └── REGISTER mutation (signup)
        ├── Success → redirect to /login
        └── Failure → inline userError alert

Login
  └── LOGIN mutation (signin)
        ├── Success → setToken(token), setName(name)  [SessionHelper]
        │            → redirect to /
        └── Failure → inline userError alert

Authenticated Requests
  └── authLink (ApolloLink) reads getToken()
        └── injects: Authorization: <jwt_token>

Logout
  └── SessionHelper.logout()
        └── localStorage.clear()
        └── window.location.href = "/login"
```

---

## 🖼️ Key UI / UX Patterns

| Pattern | Implementation |
|---|---|
| Dark-first design | `slate-950` base, `slate-900/20` card surfaces |
| Glassmorphism modals | `backdrop-blur-sm` + `bg-slate-950/85` overlays |
| Color accent system | Indigo/Purple → primary, Emerald → published, Amber → draft, Red/Rose → destructive |
| Skeleton loading | `BlogCardSkeleton` with `animate-pulse` matches live card layout exactly |
| Unsaved changes | `EditPostModal` shows amber pulsing dot when form differs from original |
| Toast feedback | `SuccessToast` / `ErrorToast` via `ValidationHelper` on all mutations |
| Cache consistency | All post mutations refetch `GET_MY_POSTS` + `GET_ALL_POSTS` |
| Responsive navbar | Hamburger menu on mobile, `animate-fadeIn` on open |
| Backdrop-click to close | All modals close when clicking outside the modal card |

---

## 📄 License

MIT © GraphQL Blog Client
