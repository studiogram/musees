import { useContext } from "react";
import { hex2rgba } from "../../utils/rgba";
import { StateContext } from "../../context/state.context";

const Loader = () => {
  const { isLoading } = useContext(StateContext);

  return (
    <>
      {isLoading && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center w-full h-full"
          style={{
            backgroundColor: hex2rgba(process.env.REACT_APP_COLOR!, 0.85),
          }}
        >
          <img src="/loader.svg" alt="Loader" className="w-16 animate-spin" />
        </div>
      )}
    </>
  );
};
export default Loader;
