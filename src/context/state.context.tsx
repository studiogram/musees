import { createContext, useState } from "react";
import { StateContextType, StateProviderProps } from "../types/state.types";

export const StateContext = createContext<StateContextType>({
  currentLocation: null,
  setCurrentLocation: () => null,
  isMobile: false,
  setIsMobile: () => null,
  isLoading: true,
  setIsLoading: () => null,
});

export const StateProvider: React.FC<StateProviderProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentLocation, setCurrentLocation] = useState<number[] | null>(null);
  const value = {
    isMobile,
    setIsMobile,
    isLoading,
    setIsLoading,
    currentLocation,
    setCurrentLocation,
  };
  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};
