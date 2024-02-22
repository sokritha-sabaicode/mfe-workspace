import React from "react";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

const root = createRoot(rootElement as HTMLElement);

root.render(
    <StrictMode>
        <App/>
    </StrictMode>
);

