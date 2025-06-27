import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./router/router.jsx";
import { RouterProvider } from "react-router";

import "aos/dist/aos.css";
import Aos from "aos";
import AuthProvider from "./contexts/AuthContext/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

Aos.init();
const queryClient = new QueryClient()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="bg-[#EAECED]">
      <div className="max-w-11/12 mx-auto">
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </QueryClientProvider>
      </div>
    </div>
  </StrictMode>
);
