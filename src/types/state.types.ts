import { ReactNode } from "react";

export type StateContextType = {
  currentLocation: number[] | null;
  setCurrentLocation: React.Dispatch<React.SetStateAction<number[] | null>>;
  isMobile: boolean;
  setIsMobile: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export type StateProviderProps = {
  children: ReactNode;
};
