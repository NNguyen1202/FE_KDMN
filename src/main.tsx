import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import App from "./App.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { HelmetProvider } from "react-helmet-async";
import { NotificationProvider } from "./context/NotificationContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <HelmetProvider>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </HelmetProvider>
    </ThemeProvider>
  </StrictMode>,
);
