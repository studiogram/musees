import gsap from "gsap";
import CyclingInfo from "../cycling/CyclingInfo";
import Button from "../button/Button";
import { useContext, useEffect, useRef } from "react";
import { MapContext } from "../../context/map.context";
import { StateContext } from "../../context/state.context";
import { addPhoneNumberSpace, formatPhoneNumber } from "../../utils/phone";

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
      <div className="info-museum__content | w-full h-full p-6 text-center md:text-start overflow-scroll">
        <h2 className="capitalize text-white text-xl md:text-2xl font-bold">
          {currentMuseum?.name}
        </h2>
        <div className="mt-2 mb-4 md:my-4 text-darkgreen">
          <p>
            {currentMuseum?.address}, {currentMuseum?.postalCode}{" "}
            {currentMuseum?.city}
          </p>
        </div>

        {currentMuseum?.phone && (
          <Button
            icon="/phone.svg"
            text={addPhoneNumberSpace(formatPhoneNumber(currentMuseum.phone))}
            url={`tel:${formatPhoneNumber(currentMuseum.phone)}`}
          />
        )}
        {currentMuseum?.website && (
          <Button
            icon="/website.svg"
            text="voir le site web"
            url={currentMuseum.website}
          />
        )}
        <CyclingInfo />
      </div>
    </div>
  );
};
export default Info;
