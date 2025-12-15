"use client";

import React, { createContext, useContext, useState } from "react";

interface LoaderContextProps {
  loading: boolean;
  setLoading: (state: boolean) => void;
}

const LoaderContext = createContext<LoaderContextProps | undefined>(undefined);

export const LoaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }
  return context;
};
