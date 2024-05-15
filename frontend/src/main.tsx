import React from "react";
import ReactDOM from "react-dom/client";
import { GlobalStyle } from "./themes";
import { Navbar } from "./components/navbar";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalStyle />
    <Navbar />
  </React.StrictMode>
);
