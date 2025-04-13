"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface TempDataContextProps {
  email: string | null;
  setEmail: React.Dispatch<React.SetStateAction<string | null>>;
}

const TempDataContext = createContext<TempDataContextProps | undefined>(
  undefined,
);

export const TempDataProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState<string | null>(null);

  return (
    <TempDataContext.Provider value={{ email, setEmail }}>
      {children}
    </TempDataContext.Provider>
  );
};

export const useTempData = () => {
  const context = useContext(TempDataContext);
  if (!context) {
    throw new Error("useTempData must be used within a TempDataProvider");
  }
  return context;
};
