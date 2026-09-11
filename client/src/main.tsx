import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { StateProvider } from "./state/StateContext";
import App from "./app/App";
import './theme.css'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StateProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StateProvider>
  </StrictMode>,
);
