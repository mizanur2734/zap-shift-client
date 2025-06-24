import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./router/router.jsx";
import { RouterProvider } from "react-router";

import "aos/dist/aos.css";
import Aos from "aos";
import AuthProvider from "./contexts/AuthContext/AuthProvider.jsx";

Aos.init();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="bg-[#EAECED]">
      <div className="max-w-11/12 mx-auto">
       <AuthProvider>
         <RouterProvider router={router} />
       </AuthProvider>
      </div>
    </div>
  </StrictMode>
);
