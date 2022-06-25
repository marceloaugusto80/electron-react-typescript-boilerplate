import { createRoot } from "react-dom/client";
import React from "react";
import MainLayout from "./MainLayout";

const container = document.getElementById("root");
if(!container) throw Error("Root element not found.");

const root = createRoot(container);

root.render(<MainLayout />);
