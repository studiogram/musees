import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import { MapProvider } from "./context/map.context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MapProvider>
      <App />
    </MapProvider>
  </React.StrictMode>
);
