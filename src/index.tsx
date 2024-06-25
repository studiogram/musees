import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import { MapProvider } from "./context/map.context";
import { StateProvider } from "./context/state.context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <StateProvider>
      <MapProvider>
        <App />
      </MapProvider>
    </StateProvider>
  </React.StrictMode>
);
