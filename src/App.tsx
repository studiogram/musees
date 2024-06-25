import { useContext, useEffect } from "react";
import { StateContext } from "./context/state.context";
import InfoMuseum from "./components/info/InfoMuseum";
import MapMuseum from "./components/map/MapMuseum";

import "./App.scss";

const App = () => {
  const { setIsMobile } = useContext(StateContext);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", checkMobile);
      window.addEventListener("orientationchange", checkMobile);
      window.addEventListener("load", checkMobile);
      window.addEventListener("reload", checkMobile);
    }
  }, []);

  const checkMobile = () => {
    setIsMobile(window.innerWidth > 768 ? false : true);
  };

  return (
    <main>
      <MapMuseum />
      <InfoMuseum />
    </main>
  );
};

export default App;
