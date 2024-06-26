import gsap from "gsap";
import CyclingInfo from "../cycling/CyclingInfo";
import { useContext, useEffect, useRef } from "react";
import { MapContext } from "../../context/map.context";
import { StateContext } from "../../context/state.context";

import "./Info.scss";

const Info = () => {
  const infoRef = useRef<HTMLDivElement>(null);
  const { currentMuseum } = useContext(MapContext);
  const { isMobile } = useContext(StateContext);

  useEffect(() => {
    if (infoRef.current === null) return;

    if (currentMuseum) {
      gsap
        .timeline()
        .set(infoRef.current, {
          xPercent: isMobile ? 0 : 100,
          yPercent: isMobile ? 100 : 0,
        })
        .add(() => {
          if (infoRef.current)
            infoRef.current.classList.add("info-museum--loaded");
        })
        .to(infoRef.current, {
          xPercent: 0,
          yPercent: 0,
          duration: 0.5,
          ease: "power3.out",
        });
    } else {
      gsap.to(infoRef.current, {
        xPercent: isMobile ? 0 : 100,
        yPercent: isMobile ? 100 : 0,
        duration: 0.5,
        ease: "power3.out",
      });
    }
  }, [currentMuseum, isMobile, infoRef]);

  return (
    <div
      className={`info ${isMobile ? "info--mobile" : ""} ${
        currentMuseum ? "info--hasmuseum" : ""
      }`}
    >
      <div className="info-museum__content | w-full h-full p-6">
        <h2>{currentMuseum?.name}</h2>
        {currentMuseum?.address} <br />
        {currentMuseum?.postalCode}, {currentMuseum?.city}
        <br />
        {currentMuseum?.phone} <br />
        {currentMuseum?.website} <br />
        <CyclingInfo />
      </div>
    </div>
  );
};
export default Info;
