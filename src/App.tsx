import { useContext, useEffect, useRef, useState } from "react";
import { StateContext } from "./context/state.context";
import MapMuseum from "./components/map/Map";
import Info from "./components/info/Info";
import Loader from "./components/loader/Loader";
import Cities from "./components/cities/Cities";
import Header from "./components/header/Header";

import "./App.scss";
import "./styles/_fonts.scss";
import "./styles/_colors.scss";
import { MapContext } from "./context/map.context";

const App = () => {
  const { isMobile, setIsMobile } = useContext(StateContext);
  const { isActiveMuseum } = useContext(MapContext);
  const appRef = useRef<HTMLDivElement>(null);
  const [mapSize, setMapSize] = useState<number | undefined>(undefined);
  const [transitionReady, setTransitionReady] = useState<boolean>(false);

  const checkMobile = () => {
    setIsMobile(window.innerWidth > 768 ? false : true);
    setMapSize(appRef.current?.clientWidth);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", checkMobile);
      window.addEventListener("orientationchange", checkMobile);
      window.addEventListener("load", checkMobile);
      window.addEventListener("reload", checkMobile);
    }
  }, []);

  useEffect(() => {
    if (!appRef.current) return;
    setTimeout(() => {
      setTransitionReady(true);
    }, 1000);
  }, [appRef]);

  useEffect(() => {
    if (!appRef.current) return;
    let mapResizer: NodeJS.Timeout;

    appRef.current.addEventListener("transitionstart", (e: TransitionEvent) => {
      if (e.target == appRef.current) {
        mapResizer = setInterval(() => {
          if (isMobile) {
            setMapSize(appRef.current?.clientHeight);
          } else {
            setMapSize(appRef.current?.clientWidth);
          }
        }, 10);
      }
    });

    appRef.current.addEventListener("transitionend", (e: TransitionEvent) => {
      if (e.target == appRef.current) {
        clearInterval(mapResizer);
      }
    });
  }, [appRef, isMobile]);

  return (
    <main
      className="p-4 h-dvh flex flex-col"
      style={{ backgroundColor: process.env.REACT_APP_COLOR }}
    >
      <Header />
      <div className="shrink w-full h-full overflow-hidden">
        <div
          ref={appRef}
          className={`app ${isMobile ? "app--mobile" : ""} ${
            isActiveMuseum ? "app--hasmuseum" : ""
          } ${
            transitionReady ? "app--transition" : ""
          } | w-full h-full overflow-hidden flex ${
            isMobile ? "flex-col" : "flex-row"
          } `}
        >
          <div className="relative shrink w-full h-full">
            <Cities />
            <MapMuseum mapSize={mapSize} />
            <Loader />
          </div>
          <Info />
        </div>
      </div>
    </main>
  );
};

export default App;
