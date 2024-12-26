"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type GlobalFormDataType = {
  name: string;
  age: string;
  birthDate: string;
  tel: string;
  img: File | null;
};

type GlobalStateContextType = {
  globalFormData: GlobalFormDataType;
  setGlobalFormData: (data: GlobalFormDataType) => void;
};

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(
  undefined
);

const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [globalFormData, setGlobalFormData] = useState<GlobalFormDataType>({
    name: "",
    age: "",
    birthDate: "",
    tel: "",
    img: null,
  });

  return (
    <GlobalStateContext.Provider value={{ globalFormData, setGlobalFormData }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};

export { GlobalStateProvider };
