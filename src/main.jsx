import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes.jsx";
import AuthProviders from "./providers/AuthProviders.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import {Toaster} from 'react-hot-toast'

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider> 
      <Toaster position="bottom-right"/>
      <QueryClientProvider client={queryClient}>
        <AuthProviders>
          <RouterProvider router={router}></RouterProvider>
        </AuthProviders>
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>
);
