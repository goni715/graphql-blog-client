import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { HttpLink } from "@apollo/client";
import { Toaster } from "react-hot-toast";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const client = new ApolloClient({
  link: new HttpLink({
    uri: baseUrl,
  }),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <Toaster position="top-right" />
      <App />
    </ApolloProvider>
  </StrictMode>,
);
