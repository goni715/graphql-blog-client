import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { HttpLink } from "@apollo/client";
import { Toaster } from "react-hot-toast";
import { ApolloLink } from "@apollo/client";
import { getToken } from "./helper/SessionHelper.ts";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const httpLink = new HttpLink({
  uri: baseUrl,
});

const authLink = new ApolloLink((operation, forward) => {
  const token = getToken();

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Authorization: token ? `${token}` : "",
    },
  }));

  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
