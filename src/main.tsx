import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { ThemeProvider } from "./components/theme-provider";
import Index from "./routes/index";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <Index />
    </ThemeProvider>
  </StrictMode>,
);
