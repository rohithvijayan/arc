"use client";
import React, { createContext, useContext, useState } from "react";
export interface SearchContextInterface {
  searchUrl: string;
  setSearchUrl: (url: string) => void;
}
export const SearchBarContext = createContext<SearchContextInterface | null>(
  null
);

export const SearchBarProvider = ({children,}: Readonly<{children: React.ReactNode;}>) => {
  const [searchUrl, setSearchUrl] = useState("https://google.com");

  const searchValue: SearchContextInterface = {
    searchUrl,
    setSearchUrl,
  };
  return (
    <SearchBarContext.Provider value={searchValue}>
      {children}
    </SearchBarContext.Provider>
  );
};

