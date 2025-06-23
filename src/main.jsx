import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./router/router.jsx";
import { RouterProvider } from "react-router";

import "aos/dist/aos.css";
import Aos from "aos";

Aos.init;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="bg-[#EAECED]">
      <div className="font-urbanists max-w-11/12 mx-auto">
        <RouterProvider router={router} />
      </div>
    </div>
  </StrictMode>
);
