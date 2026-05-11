import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./providers/AuthProvider.jsx";
import { router } from "./routes/router.jsx";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        theme="dark"
        autoClose={3200}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </AuthProvider>
  </StrictMode>
);
