import { useContext, useEffect } from "react";
import { StateContext } from "./context/state.context";
import MapMuseum from "./components/map/Map";
import Info from "./components/info/Info";
import Loader from "./components/loader/Loader";

import "./App.scss";
import Cities from "./components/cities/Cities";

const App = () => {
  const { isMobile, setIsMobile } = useContext(StateContext);

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
    <main
      className="p-4 h-dvh flex flex-col"
      style={{ backgroundColor: process.env.REACT_APP_COLOR }}
    >
      <h1 className="text-center text-white text-2xl font-bold">
        Musées de France
      </h1>
      <div
        className={`shrink w-full h-full overflow-hidden flex ${
          isMobile ? "flex-col" : "flex-row"
        }`}
      >
        <div className="relative shrink w-full h-full">
          <Cities />
          <MapMuseum />
          <Loader />
        </div>
        <Info />
      </div>
    </main>
  );
};

export default App;
