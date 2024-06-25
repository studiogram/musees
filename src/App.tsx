import { useContext, useEffect } from "react";
import { StateContext } from "./context/state.context";
import MapMuseum from "./components/map/Map";
import Info from "./components/info/Info";
import Loader from "./components/loader/Loader";

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
    <main
      className="p-4"
      style={{ backgroundColor: process.env.REACT_APP_COLOR }}
    >
      <h1 className="text-center text-white text-2xl font-bold">
        Musées de France
      </h1>
      <MapMuseum />
      <Info />
      <Loader />
    </main>
  );
};

export default App;
