"use client";

import { createContext, useContext, useState } from "react";

export type TSplashContext = {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
};

const defaultSplashValues = {
  isOpen: true,
  setIsOpen: () => {},
};

const SplashContext = createContext<TSplashContext>(defaultSplashValues);

export type SplashProviderProps = {
  children?: React.ReactNode;
};

export function SplashProvider(props: SplashProviderProps) {
  const { children } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <SplashContext.Provider
      value={{
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </SplashContext.Provider>
  );
}

export function useSplashContext() {
  return useContext(SplashContext);
}
